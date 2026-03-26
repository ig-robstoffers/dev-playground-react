export class BaseSale {
    private _status: string;
    public get status() : string {
        return this._status;
    }
    public set status(status: string) {
        this._status = status;
    }
}

export class Sale extends BaseSale {
    private _country: string;
    public get Country() : string {
        return this._country;
    }
    public set Country(country: string) {
        this._country = country;
    }

    private _margin: number;
    public get margin() : number {
        return this._margin;
    }
    public set margin(margin: number) {
        this._margin = margin;
    }

    public OrderDate: Date;
    public OrderItems: number;
    public OrderValue: number;
    public ProductPrice: number;
    public ProductID: number;
    public ProductName: string;
    public Profit: number;
    public Image: string;
    public Metadata: Metadata;
}

export class Metadata {
    public CountryCode: number;
}

export class DataGenerator {
    static countries: string[] = [
        "USA", "UK", "France", "Canada", "Poland",
        "Denmark", "Croatia", "Australia", "Seychelles",
        "Sweden", "Germany", "Japan", "Ireland",
        "Barbados", "Jamaica", "Cuba", "Spain"
    ];

    public static getSales(count: number = 100) : Sale[] {
        let sales: Sale[] = [];

        const names = [
            "Intel CPU", "AMD CPU",
            "Intel Motherboard", "AMD Motherboard", "Nvidia Motherboard",
            "Nvidia GPU", "Gigabyte GPU", "Asus GPU", "AMD GPU", "MSI GPU",
            "Corsair Memory", "Patriot Memory", "Skill Memory",
            "Samsung HDD", "WD HDD", "Seagate HDD", "Intel HDD", "Asus HDD",
            "Samsung SSD", "WD SSD", "Seagate SSD", "Intel SSD", "Asus SSD",
            "Samsung Monitor", "Asus Monitor", "LG Monitor", "HP Monitor"
        ];

        const countries = [
            "USA", "UK", "France", "Canada", "Poland",
            "Denmark", "Croatia", "Australia", "Seychelles",
            "Sweden", "Germany", "Japan", "Ireland",
            "Barbados", "Jamaica", "Cuba", "Spain"
        ];

        const dates = [
            // new Date(2015, 11, 11),
            // new Date(2016, 0, 2),
            // new Date(2015, 0, 2),
            // new Date(2015, 10, 25),
            // new Date(2015, 9, 5, 10, 30, 30),
            // new Date(2015, 6, 13),

            new Date(2021, 10, 3),
            new Date(2021, 10, 6),
            new Date(2021, 10, 10),
            new Date(2021, 10, 7),
            new Date(2021, 9, 27),
            new Date(2021, 9, 24),
            new Date(2021, 9, 30),
            new Date(2021, 11, 2),
            new Date(2015, 1, 1)
        ];

        const status = [ "Packing", "Shipped", "Delivered" ];

        for (let i = 0; i < count; i++)
        {
            let countryIndex = Math.round(this.getRandomNumber(0, countries.length - 1));
            let nameIndex = Math.round(this.getRandomNumber(0, names.length - 1));
            let statusIndex = Math.round(this.getRandomNumber(0, status.length - 1));
            let dateIndex = Math.round(this.getRandomNumber(0, dates.length - 1));
            let date = dates[dateIndex];

            let sale = new Sale();
            sale.ProductPrice = this.getRandomNumber(100, 2000);
            sale.ProductID = i;
            sale.ProductName = names[nameIndex];
            sale.Country = countries[countryIndex];
            sale.Metadata = new Metadata();
            sale.Metadata.CountryCode = countryIndex;
            sale.margin = this.getRandomNumber(2, 5);
            sale.OrderDate = date;
            sale.OrderItems = this.getRandomNumber(4, 30);
            sale.OrderValue = Math.round(sale.ProductPrice * sale.OrderItems);
            sale.Profit = Math.round((sale.ProductPrice * sale.margin / 100) * sale.OrderItems);
            sale.status = status[statusIndex];
            sale.Image = "https://winaero.com/blog/wp-content/uploads/2019/11/Photos-new-icon.png";
            sales.push(sale);
        }
        return sales;
    }

    public static getCountries(): any[] {
        let c: any[] = [];
        for (let i = 0; i < this.countries.length; i++) {
            c.push({ name: this.countries[i] });
        }
        return c;
    }

    public static getRandomCountry(): string {
        let countryIndex = Math.round(this.getRandomNumber(0, this.countries.length - 1));
        return this.countries[countryIndex];
    }

    public static getRandomNumber(min: number, max: number) : number {
        //return Math.round(min + Math.random() * (max - min));
        return min + Math.random() * (max - min);
    }

    public static getLongStringData(rowCount: number, columnCount: number) : any[] {
        const lorem = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut porttitor risus a purus rutrum varius eu nec arcu. Integer eget eros at nisl elementum mattis. Etiam aliquam lacinia lorem, at tristique eros facilisis non. Curabitur rhoncus neque ut tincidunt elementum. Maecenas mattis non urna eu dignissim. Maecenas volutpat pellentesque euismod. Praesent sed volutpat mi. Pellentesque non ultrices eros. Donec et finibus neque, non placerat nulla. Phasellus fermentum lobortis nisi. In hac habitasse platea dictumst. Nam ut enim sapien. Morbi maximus eleifend metus, sit amet vulputate mauris fringilla a. Vivamus pretium eleifend justo at suscipit. Aliquam non tortor vitae arcu dictum convallis eget et nisl. Donec lorem elit, dapibus quis posuere vel, ultricies id risus. Etiam non nibh felis. Nam a mattis leo, sed porta lectus. Proin nec lectus nunc. Donec aliquet ligula vitae leo tristique, blandit vehicula felis interdum. Morbi nec cursus massa. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi massa nunc, ultricies eu est at, tempor aliquam elit. Ut ultricies vel mauris a sagittis. Integer pharetra nulla diam, in fringilla ex pellentesque vel. Donec convallis dui quis finibus egestas. Nam posuere magna ut vestibulum interdum. Aliquam rutrum faucibus tempor. Aliquam et enim aliquam ligula tristique elementum id sit amet ligula. Quisque mollis, tortor pharetra accumsan congue, lectus enim auctor neque, vel imperdiet neque augue vitae ex. Sed eu nunc sed ex finibus sodales gravida at ante. Vivamus condimentum nisl eget sem placerat convallis. Integer id mauris id mi luctus ornare ac non neque. Phasellus molestie maximus nisl, sed vestibulum magna condimentum ut. Integer bibendum lectus ac arcu tincidunt, facilisis feugiat neque volutpat. Phasellus vitae pellentesque est. Suspendisse dictum sapien eget sem gravida, in bibendum elit volutpat. Curabitur nec arcu a risus euismod sollicitudin nec non lectus. Maecenas blandit in diam sit amet interdum. Nam euismod vestibulum volutpat. Vestibulum volutpat interdum pulvinar. Aenean vitae nibh sagittis, tincidunt leo vitae, ultricies quam. Duis vel dolor hendrerit, posuere eros eget, lobortis justo. Aenean sed sem consequat, pellentesque odio a, sodales est. Nullam eu mauris id neque suscipit interdum quis sed enim.`

        const items = [];

        for (let i = 0; i < rowCount; i++) {
            let item = {};
            for (let j = 0; j < columnCount; j++) {
                const length = this.getRandomNumber(20, 100);
                const pos  =this.getRandomNumber(0, lorem.length - length);
                item[`Column${j}`] = lorem.substr(pos, length).trim();
            }
            items.push(item);
        }
        return items;
    }

    public static getTestData() : any[] {
        /*
        | Key | FirstName | LastName | Age | Updated    | Value |
		| 0_1 | Mike      | Teller    | 50  | 12/11/2015 | 200   |
		| 0_2 | Chris     | Teller   | 21  | 10/23/2015 | 500   |
		| 0_3 | Nick      | Jenas    | 30  | 11/12/2015 | 700   |
		| 0_4 | Thomas    | Bailey   | 18  | 11/25/2015 | 900   |
		| 0_5 | Jane      | Bailey    | 23  | 12/11/2015 | 130   |
        */
        let list = [];
        list.push({ Key: "0_1", FirstName: "Mike", LastName: "Teller", Age: 50, Updated: new Date(Date.now()), Value: 200 });
        list.push({ Key: "0_2", FirstName: "Chris", LastName: "Teller", Age: 21, Updated: new Date(Date.now()), Value: 500 });
        list.push({ Key: "0_3", FirstName: "Nick", LastName: "Jenas", Age: 30, Updated: new Date(Date.now()), Value: 700 });
        list.push({ Key: "0_4", FirstName: "Thomas", LastName: "Bailey", Age: 18, Updated: new Date(Date.now()), Value: 900 });
        list.push({ Key: "0_5", FirstName: "Jane", LastName: "Bailey", Age: 23, Updated: new Date(Date.now()), Value: 130 });
        return list;
    }

    public static getTemperatures(startValue: number, startYear: number, endYear: number): any[] {
        const data: any[] = [];
        let value = startValue;
        for (let i = startYear; i <= endYear; i++) {
            value += (Math.random() - 0.5) * 0.5;
            const v = Math.abs(Math.round(value * 10) / 10);
            data.push({ Label: i.toString(), Value: v });
        }
        return data;
    }
}