import TitleId from 'src/domain/value-objects/TitleId';

export class GetTitleServersQuery {
  constructor(public readonly title: TitleId) {}
}
