import Api from '../../interfaces/api-interface';
import Scm from '../../interfaces/scm-interface';
export default abstract class UseCase {
    protected issueTracker: Api;
    protected scm: Scm;
    constructor(tracker: Api, scm: Scm);
    abstract run(): Promise<any>;
}
