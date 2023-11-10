import {Component, inject, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Country, CountryService} from "../../services/country.service";
import {Region, RegionService} from "../../services/region.service";


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
  regions!: Region[];
  countries!: Country[];
  private countries_cache: Record<string, Country[]> = {};

  ngOnInit(): void {

    this.countryService.getCountries().subscribe((countries) => {
      this.countries = countries;
      this.countries_cache[''] = countries;
    })

    this.regionService.getRegions().subscribe((regions) => {
      this.regions = regions;
    })

    this.myForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      weight: ['', [Validators.required, Validators.min(0.1)]],
      width: ['', [Validators.required, Validators.min(0.1)]],
      height: ['', [Validators.required, Validators.min(0.1)]],
      // Selects
      region: ['', [Validators.required]],
      country_origin: ['', [Validators.required]],
      country_destination: [{value: '', disabled: true}, [Validators.required]],
    });

    this.myForm.get('region')?.valueChanges.subscribe((value) => {
      if (!value) this.myForm.get('country_destination')?.disable();
      else this.myForm.get('country_destination')?.enable();
    })
  }


  isControlInvalidAndTouched(controlName: string): boolean {
    const control = this.myForm.get(controlName);
    return Boolean(control?.invalid && control?.touched);
  }

  filterCountries() {
    this.clearCountryDestination();
    if (this.myForm.get('region')?.value === null) return;

    const {region_id} = this.myForm.value.region;
    if (this.countries_cache[region_id]) {
      this.countries = this.countries_cache[region_id];
      return;
    }
    this.countries = this.countries_cache[''].filter(country => country.region_id === region_id);
    this.countries_cache[region_id] = this.countries;
  }

  private clearCountryDestination() {
    this.myForm.get('country_destination')?.setValue('');
  }

  protected readonly AbstractControl = AbstractControl;
}
