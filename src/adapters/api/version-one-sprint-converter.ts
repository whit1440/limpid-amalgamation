import Sprint from '../../entities/Sprint'
import DateUtil from '../../util/date-util'

export default class SprintConverter {
  /**
   * Convert VersionOne API response json to Sprint entity
   * @param  {any}    json [API response body]
   * @return {Sprint}      [Sprint entity instance]
   */
  static jsonToSprint(json: any): Sprint {
    let id: number = parseInt(json.id.split(':')[1])
    let startDate: Date = DateUtil.calenderDateToISO(json.Attributes.BeginDate.value)
    let endDate: Date = DateUtil.calenderDateToISO(json.Attributes.EndDate.value)
    let name = json.Attributes.Name.value
    let path = json.href
    return new Sprint(id, name, path, startDate, endDate)
  }
}
