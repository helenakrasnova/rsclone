import { DropDownViewModel } from './DropDownViewModel';
export interface LanguagesModel extends DropDownViewModel{
  iso_639_1: string,
  english_name: string,
  name: string,
}
