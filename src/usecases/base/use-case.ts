import Api from '../../interfaces/api-interface'
import Scm from '../../interfaces/scm-interface'

export default abstract class UseCase {
  protected issueTracker: Api
  protected scm: Scm

  constructor(tracker: Api, scm: Scm) {
    this.issueTracker = tracker
    this.scm = scm
  }
  public abstract run(): Promise<any>
}
