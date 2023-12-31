import {Component, EventEmitter, inject, OnInit, Output} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Country, CountryService} from "../../services/country.service";
import {Region, RegionService} from "../../services/region.service";
import {ShippingCalculationService} from "../../services/shipping-calculation.service";
import {Observable} from "rxjs";
import {wait} from "../../constants";
import {ToastService} from "../../services/toast.service";
import {AuthService, User} from "../../services/auth.service";


type Form = {
  weight: number,
  width: number,
  height: number,
  length: number,
  region: Region,
  country_origin: Country,
  country_destination: Country,
}

@Component({
  selector: 'app-shipping-calculator-form',
  templateUrl: './shipping-calculator-form.component.html',
  styleUrls: ['./shipping-calculator-form.component.scss']
})
export class ShippingCalculatorFormComponent implements OnInit {
  myForm!: FormGroup;
  private fb = inject(FormBuilder);
  private countryService = inject(CountryService);
  private regionService = inject(RegionService);
  private shippingCalculationService = inject(ShippingCalculationService);
  private toastService = inject(ToastService);
  private authService = inject(AuthService);

  currentUser: User | null = null;
  regions: Observable<Region[]> = this.regionService.getRegions()
  countries: Observable<Country[]> = this.countryService.getCountries();
  destinationCountry!: Observable<Country[]>;
  loading = false;
  @Output() cost = new EventEmitter<number>();

  ngOnInit(): void {
    this.authService.currentUser$.subscribe((currentUser) => {
      this.currentUser = currentUser;
    })

    this.myForm = this.fb.group({
      weight: ['', [Validators.required, Validators.min(0.1)]],
      width: ['', [Validators.required, Validators.min(0.1)]],
      height: ['', [Validators.required, Validators.min(0.1)]],
      length: ['', [Validators.required, Validators.min(0.1)]],
      // Selects
      region: [null, [Validators.required]],
      country_origin: [null, [Validators.required]],
      country_destination: [{value: null, disabled: true}, [Validators.required]],
    });

    this.myForm.get('region')?.valueChanges.subscribe((value) => {
      if (!value) this.myForm.get('country_destination')?.disable();
      else this.myForm.get('country_destination')?.enable();
    })
  }

  fetchCountries() {
    this.clearCountryDestination();
    if (!this.myForm.get('region')?.value) return;

    this.destinationCountry = this.countryService.getCountriesByRegion(this.myForm.get('region')?.value.regionId);
  }

  private clearCountryDestination() {
    this.myForm.get('country_destination')?.setValue(null);
    this.destinationCountry = new Observable<Country[]>();
  }

  calculateShippingCost() {
    console.log(this.myForm.valid)
    if (!this.myForm.valid) {
      // activate all validators
      this.myForm.markAllAsTouched();
      this.toastService.show("Campos Incompletos! Por favor, complete los campos", "danger");
      return
    }

    const {
      weight,
      width,
      height,
      length,
      region,
      country_destination,
      country_origin
    }: Form = this.myForm.getRawValue();

    const obj = {
      // user: {name: '', email: '', userType: null as unknown as 'COMMON', userId: 10},
      user: this.currentUser || undefined,
      weight,
      width,
      height,
      length,
      region: region.name,
      originCountry: country_origin.name,
      destinationCountry: country_destination.name
    };

    this.loading = true;
    this.shippingCalculationService.shippingCalculation(obj).subscribe((cost) => {
      this.cost.emit(Number(cost));
      wait(1).then(() => {
        this.loading = false;
        this.toastService.show("Costo de envío calculado exitosamente!", "success");
      })
    });
  }

  protected readonly AbstractControl = AbstractControl;
  formFields = [
    {
      change: null,
      name: 'Pais de Destino',
      controlName: 'country_origin',
      placeholder: 'Selecciona tu pais de origen',
      items: this.countries
    },
    {
      name: 'Region',
      change: this.fetchCountries.bind(this),
      controlName: 'region',
      placeholder: 'Selecciona una region',
      items: this.regions
    },
  ];

  trackByFn(_: number, item: any) {
    return item?.placeholder;
  }
}
