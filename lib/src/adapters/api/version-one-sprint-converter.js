"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Sprint_1 = require("../../entities/Sprint");
const date_util_1 = require("../../util/date-util");
class SprintConverter {
    /**
     * Convert VersionOne API response json to Sprint entity
     * @param  {any}    json [API response body]
     * @return {Sprint}      [Sprint entity instance]
     */
    static jsonToSprint(json) {
        let id = parseInt(json.id.split(':')[1]);
        let startDate = date_util_1.default.calenderDateToISO(json.Attributes.BeginDate.value);
        let endDate = date_util_1.default.calenderDateToISO(json.Attributes.EndDate.value);
        let name = json.Attributes.Name.value;
        let path = json.href;
        return new Sprint_1.default(id, name, path, startDate, endDate);
    }
}
exports.default = SprintConverter;
