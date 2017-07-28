export default class Provider {
    private types;
    /**
     * Expects an instantiated object. It will be stored based on class name
     * so if you set an object of the same class type twice, the first will be overridden
     * @param  {any} obj An instance of any class type
     */
    set(obj: any): void;
    /**
     * Pass in a class type and get back any instance of that class (assuming one has been set)
     * @param  {any} type The class type you desire
     * @return {any}      Previously set instantiation of the class
     */
    get(type: any): any;
}
