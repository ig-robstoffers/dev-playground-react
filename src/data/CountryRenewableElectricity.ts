import { schemaHint } from 'igniteui-core';
import { DataSourceSchemaPropertyType } from 'igniteui-core';

export class CountryRenewableElectricityItem {
    public constructor(init: Partial<CountryRenewableElectricityItem>) {
        Object.assign(this, init);
    }

    public label: string | null;
    public year: string | null;
    public europe: number | null;
    public china: number | null;
    public america: number | null;

}
export class CountryRenewableElectricity extends Array<CountryRenewableElectricityItem> {
    public constructor(items: Array<CountryRenewableElectricityItem> | number = -1) {
        if (Array.isArray(items)) {
            super(...items);
        } else {
            const newItems = [
                new CountryRenewableElectricityItem(
                {
                    label: null,
                    year: null,
                    europe: null,
                    china: null,
                    america: null
                }),
                new CountryRenewableElectricityItem(
                {
                    label: "B",
                    year: `2010`,
                    europe: 43,
                    china: 26,
                    america: 24
                }),
                new CountryRenewableElectricityItem(
                {
                    label: "C",
                    year: `2011`,
                    europe: 66,
                    china: 29,
                    america: 28
                }),
                new CountryRenewableElectricityItem(
                {
                    label: "D",
                    year: `2012`,
                    europe: 69,
                    china: 32,
                    america: 26
                }),
                new CountryRenewableElectricityItem(
                {
                    label: "E",
                    year: `2013`,
                    europe: 58,
                    china: 47,
                    america: 38
                }),
                new CountryRenewableElectricityItem(
                {
                    label: "F",
                    year: `2014`,
                    europe: 40,
                    china: 46,
                    america: 31
                }),
                new CountryRenewableElectricityItem(
                {
                    label: "G",
                    year: `2015`,
                    europe: 78,
                    china: 50,
                    america: 19
                }),
                new CountryRenewableElectricityItem(
                {
                    label: "K",
                    year: `2016`,
                    europe: 13,
                    china: 90,
                    america: 52
                }),
                new CountryRenewableElectricityItem(
                {
                    label: "J",
                    year: `2017`,
                    europe: 78,
                    china: 132,
                    america: 50
                }),
                new CountryRenewableElectricityItem(
                {
                    label: "K",
                    year: `2018`,
                    europe: 40,
                    china: 134,
                    america: 34
                }),
                new CountryRenewableElectricityItem(
                {
                    label: "L",
                    year: `2018`,
                    europe: 40,
                    china: 134,
                    america: 34
                }),
                new CountryRenewableElectricityItem(
                {
                    label: "M",
                    year: `2019`,
                    europe: 80,
                    china: 96,
                    america: 38
                }),
            ];
            super(...newItems.slice(0));
        }
    }
}
