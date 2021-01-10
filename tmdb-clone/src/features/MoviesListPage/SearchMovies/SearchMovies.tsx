import { Component } from "react";
import { Accordion, AccordionTitleProps, Button, Checkbox, CheckboxProps, Dropdown, DropdownProps, Icon } from "semantic-ui-react";
import './searchMovies.css';
import { genres } from './../../../configuration/genres';
import { ReleaseTypes } from './../../../models/ReleaseTypes';
import { countries } from './../../../configuration/countries';
import { certification } from './../../../configuration/certification';
import { CertificationModel } from './../../../models/CertificationModel';
import { languages } from './../../../configuration/languages';
import Slider, { Range } from 'rc-slider';
import 'rc-slider/assets/index.css';

export type SearchMoviesState = {
  activeIndex: number | string | undefined;
  isAllReleases: boolean;
  releaseTypes: Set<ReleaseTypes>;
  isAllCountries: boolean;
  releaseCountry: string | null;
  certification: Set<string>;
  selectedLanguage: string | null;
  voteAverageMin: number;
  voteAverageMax: number;
  voteCountMin: number;
  movieDurationMin: number;
  movieDurationMax: number;
  releaseDateFrom: string;
  releaseDateTo: string;
  genres: Set<string>;
}
type SearchMoviesProps = {
  onSearchClicked: (state: SearchMoviesState) => void;
  initialFilter: SearchMoviesState;
}
class SearchMovies extends Component<SearchMoviesProps, SearchMoviesState> {
  constructor(props: SearchMoviesProps) {
    super(props);
    this.state = props.initialFilter;
  }

  handleAccordionClicked = (e: React.MouseEvent<HTMLDivElement>, titleProps: AccordionTitleProps) => {
    const { index } = titleProps;
    const newIndex = this.state.activeIndex === index ? -1 : index;
    this.setState({ activeIndex: newIndex });
  }

  handleGenreChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
    const copyGenres = new Set(this.state.genres);
    if (event.target.checked) {
      copyGenres.add(event.target.value);
    } else {
      copyGenres.delete(event.target.value);
    }
    this.setState({
      genres: copyGenres,
    });
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

  handleLanguageChanged = (event: React.SyntheticEvent<HTMLElement>, data: DropdownProps) => {
    this.setState({
      selectedLanguage: data.value as string,
    });
  }

  handleUserScoreChanged = (values: number[]) => {
    this.setState({
      voteAverageMin: values[0],
      voteAverageMax: values[1],
    });
  }

  handleUserVotesChanged = (value: number) => {
    this.setState({
      voteCountMin: value,
    });
  }

  handleRuntimeChanged = (values: number[]) => {
    this.setState({
      movieDurationMin: values[0],
      movieDurationMax: values[1],
    });
  }

  handleSearchClicked = () => {
    this.props.onSearchClicked(this.state);
  }

  handleReleaseDateFrom = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      releaseDateFrom: event.target.value
    });
  }

  handleReleaseDateTo = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      releaseDateTo: event.target.value
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
                    value={genre.id}
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
                  onChange={this.handleReleaseDateFrom}
                  min="1900-01-01" max="2099-12-31"
                />
              </label>
              <label>
                To
                <input type="date" id="to" name="to"
                  onChange={this.handleReleaseDateTo}
                  min="1900-01-01" max="2099-12-31"
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

          <Accordion.Content active={activeIndex === 1}>
            <div>
              <p>Language</p>
              <Dropdown
                placeholder='Select language'
                fluid
                selection
                search
                options={languages}
                onChange={this.handleLanguageChanged}
              />
            </div>
          </Accordion.Content>


          <Accordion.Content active={activeIndex === 1}>
            <div>
              <p>User Score</p>
              <Range
              value={[this.state.voteAverageMin, this.state.voteAverageMax]}
                min={0}
                max={10}
                step={1}
                onChange={this.handleUserScoreChanged}
                marks={{ 0: 0, 5: 5, 10: 10 }}
              />
            </div>
          </Accordion.Content>

          <Accordion.Content active={activeIndex === 1}>
            <div>
              <p>Minimum User Votes</p>
              <Slider

                min={0}
                max={500}
                step={50}
                onChange={this.handleUserVotesChanged}
                marks={{ 0: 0, 100: 100, 200: 200, 300: 300, 400: 400, 500: 500 }} />
            </div>
          </Accordion.Content>

          <Accordion.Content active={activeIndex === 1}>
            <div>
              <p>Runtime</p>
              <Range
              value={[this.state.movieDurationMin, this.state.movieDurationMax]}
                min={0}
                max={400}
                step={15}
                onChange={this.handleRuntimeChanged}
                marks={{ 0: 0, 120: 120, 240: 240, 360: 360 }} />
            </div>
          </Accordion.Content>
        </Accordion>
        <Button
          primary
          className="search-button"
          onClick={this.handleSearchClicked}
        >Search</Button>
      </div >
    );
  }
}
export default SearchMovies;
