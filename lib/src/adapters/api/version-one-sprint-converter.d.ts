import Sprint from '../../entities/Sprint';
export default class SprintConverter {
    /**
     * Convert VersionOne API response json to Sprint entity
     * @param  {any}    json [API response body]
     * @return {Sprint}      [Sprint entity instance]
     */
    static jsonToSprint(json: any): Sprint;
}
