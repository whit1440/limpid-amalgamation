import UseCase from '../../src/usecases/base/use-case';
export default class UseCaseStub extends UseCase {
    type: string;
    run(): Promise<{}>;
}
