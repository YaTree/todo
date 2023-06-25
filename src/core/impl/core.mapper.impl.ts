import _ from 'underscore';

export class MapperImpl {
    private static _Instance: MapperImpl | null = null;
    private customConverters: any = {};

    public static get Instance(): MapperImpl {
        if (_.isNull(MapperImpl._Instance)) {
            MapperImpl._Instance = new MapperImpl();
        }
        return MapperImpl._Instance;
    }

    public convert<A>(data: any, c: new () => A): A {
        let newObject: any = new c();

        const props: string[] = Object.getOwnPropertyNames(newObject);
        for (let i = 0; i < props.length; i++) {
            const prop = props[i];

            if (!_.isUndefined(newObject[prop])) {
                newObject[prop] = data[prop];
            }
        }

        if (!_.isUndefined(this.customConverters[data.constructor.name + '_' + newObject.constructor.name])) {
            return this.customConverters[data.constructor.name + '_' + newObject.constructor.name].convert(data, newObject) as A;
        }
        return newObject as A;
    }

    public convertList<A>(data: any[], c: new () => A): A[] {
        let results: A[] = [];

        for (let i = 0; i < data.length; i++) {
            results.push(this.convert(data[i], c) as A);
        }

        return results;
    }
}

export let Mapper = MapperImpl.Instance;

