import { Component } from "react";
import { Accordion, AccordionTitleProps, Checkbox, CheckboxProps, Dropdown, DropdownProps, Icon } from "semantic-ui-react";
import './searchMovies.css';
import { genres } from './../../../configuration/genres';
import { ReleaseTypes } from './../../../models/ReleaseTypes';
import { countries } from './../../../configuration/countries';
import { certification } from './../../../configuration/certification';
import { CertificationModel } from './../../../models/CertificationModel';
type SearchMoviesState = {
  activeIndex: number | string | undefined;
  isAllReleases: boolean;
  releaseTypes: Set<ReleaseTypes>;
  isAllCountries: boolean;
  releaseCountry: string | null;
  certification: Set<string>;
}
type SearchMoviesProps = {

}
class SearchMovies extends Component<SearchMoviesProps, SearchMoviesState> {
  constructor(props: SearchMoviesProps) {
    super(props);
    this.state = {
      activeIndex: 0,
      isAllReleases: true,
      releaseTypes: new Set([1, 2, 3, 4, 5, 6]),
      isAllCountries: true,
      releaseCountry: null,
      certification: new Set([]),
    }
  }

  handleAccordionClicked = (e: React.MouseEvent<HTMLDivElement>, titleProps: AccordionTitleProps) => {
    const { index } = titleProps;
    const newIndex = this.state.activeIndex === index ? -1 : index;
    this.setState({ activeIndex: newIndex });
  }

  handleGenreChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
    debugger
  }

  handleAllReleasesChanged = (event: React.FormEvent<HTMLInputElement>) => {
    this.setState({
      isAllReleases: !this.state.isAllReleases,
    });
  }

  handleAllCountriesChanged = (event: React.FormEvent<HTMLInputElement>) => {
    this.setState({
      isAllCountries: !this.state.isAllCountries,
    });
  }

  handleReleaseTypeChange = (event: React.FormEvent<HTMLInputElement>, data: CheckboxProps) => {
    const copyReleaseTypes = new Set(this.state.releaseTypes);
    if (data.checked) {
      copyReleaseTypes.add(data.value as number);
    } else {
      copyReleaseTypes.delete(data.value as number);
    }
    this.setState({
      releaseTypes: copyReleaseTypes,
    });
  }

  handleCountryClicked = (event: React.SyntheticEvent<HTMLElement>, data: DropdownProps) => {
    this.setState({
      releaseCountry: data.value as string,
    });
  }

  handleCertificationChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
    const copyCertification = new Set(this.state.certification);
    if (event.target.checked) {
      copyCertification.add(event.target.value);
    } else {
      copyCertification.delete(event.target.value);
    }
    this.setState({
      certification: copyCertification,
    });
  }

  render = () => {
    const { activeIndex } = this.state;
    return (
      <div className="searchMovies" >
        <Accordion>
          <Accordion.Title
            active={activeIndex === 1}
            index={1}
            onClick={this.handleAccordionClicked}
          >
            <Icon name='dropdown' />
              Filters
        </Accordion.Title>
          <Accordion.Content active={activeIndex === 1}>
            <div>
              <p>Genres</p>
              {genres.map((genre) => (
                <label className="checkbox-btn" key={genre.id}>
                  <input
                    type="checkbox"
                    data-id={genre.id}
                    onChange={this.handleGenreChanged} />
                  <span>{genre.name}</span>
                </label>
              ))}
            </div>
          </Accordion.Content>
          <Accordion.Content active={activeIndex === 1}>
            <div className="releaseDates">
              <p>Release Dates</p>
              <Checkbox label='Search all releases?' checked={this.state.isAllReleases} onChange={this.handleAllReleasesChanged} />
              {!this.state.isAllReleases &&
                <>
                  <Checkbox
                    label='Search all countries?'
                    onChange={this.handleAllCountriesChanged}
                    checked={this.state.isAllCountries}
                  />
                  {!this.state.isAllCountries &&
                    <Dropdown
                      placeholder='Select Country'
                      fluid
                      search
                      selection
                      value={this.state.releaseCountry as any}
                      options={countries}
                      onChange={this.handleCountryClicked}
                    />
                  }
                  <Checkbox
                    label='Premiere'
                    checked={this.state.releaseTypes.has(ReleaseTypes.Premiere)}
                    onChange={this.handleReleaseTypeChange}
                    value={ReleaseTypes.Premiere}
                  />
                  <Checkbox
                    label='Theatrical (limited)'
                    checked={this.state.releaseTypes.has(ReleaseTypes.Theatrical_limited)}
                    onChange={this.handleReleaseTypeChange}
                    value={ReleaseTypes.Theatrical_limited}
                  />
                  <Checkbox
                    label='Theatrical'
                    checked={this.state.releaseTypes.has(ReleaseTypes.Theatrical)}
                    onChange={this.handleReleaseTypeChange}
                    value={ReleaseTypes.Theatrical}
                  />
                  <Checkbox
                    label='Digital'
                    checked={this.state.releaseTypes.has(ReleaseTypes.Digital)}
                    onChange={this.handleReleaseTypeChange}
                    value={ReleaseTypes.Digital}
                  />
                  <Checkbox
                    label='Physical'
                    checked={this.state.releaseTypes.has(ReleaseTypes.Physical)}
                    onChange={this.handleReleaseTypeChange}
                    value={ReleaseTypes.Physical}
                  />
                  <Checkbox
                    label='TV'
                    checked={this.state.releaseTypes.has(ReleaseTypes.TV)}
                    onChange={this.handleReleaseTypeChange}
                    value={ReleaseTypes.TV}
                  />
                </>
              }
              <label>
                From
                <input type="date" id="from" name="from"
                // min="2018-01-01" max="2018-12-31"
                />
              </label>
              <label>
                To
                <input type="date" id="to" name="to"
                // min="2018-01-01" max="2018-12-31"
                />
              </label>
            </div>
          </Accordion.Content>

          <Accordion.Content active={activeIndex === 1}>
            <div>
              <p>Certification</p>
              {certification.US.sort((a: CertificationModel, b: CertificationModel) => a.order - b.order).map((item: CertificationModel) => (
                <label className="checkbox-btn" key={item.certification}>
                  <input
                    type="checkbox"
                    data-id={item.certification}
                    value={item.certification}
                    onChange={this.handleCertificationChanged} />
                  <span>{item.certification}</span>
                </label>
              ))}
            </div>
          </Accordion.Content>




        </Accordion>

      </div >
    );
  }
}
export default SearchMovies;
