import {Component} from 'react'
import Cookies from 'js-cookie'
import {BsSearch} from 'react-icons/bs'
import Loader from 'react-loader-spinner'

import Header from '../Header'
import JobCard from '../JobCard'
import FiltersGroup from '../FiltersGroup'

import {
  employmentTypesList,
  salaryRangesList,
  locationsList,
} from '../../utils/constants'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Jobs extends Component {
  state = {
    profileData: {},
    jobsList: [],
    profileApiStatus: apiStatusConstants.initial,
    jobsApiStatus: apiStatusConstants.initial,
    searchInput: '',
    employmentType: [],
    minimumPackage: '',
    locationFilters: [],
  }

  componentDidMount() {
    this.getProfile()
    this.getJobs()
  }

  getProfile = async () => {
    this.setState({profileApiStatus: apiStatusConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')

    const options = {
      headers: {Authorization: `Bearer ${jwtToken}`},
      method: 'GET',
    }

    const response = await fetch('https://apis.ccbp.in/profile', options)
    const data = await response.json()

    if (response.ok === true) {
      this.setState({
        profileData: data.profile_details,
        profileApiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({profileApiStatus: apiStatusConstants.failure})
    }
  }

  getJobs = async () => {
    this.setState({jobsApiStatus: apiStatusConstants.inProgress})
    const {searchInput, employmentType, minimumPackage} = this.state
    const jwtToken = Cookies.get('jwt_token')

    const employment = employmentType.join(',')

    const apiUrl = `https://apis.ccbp.in/jobs?employment_type=${employment}&minimum_package=${minimumPackage}&search=${searchInput}`

    const options = {
      headers: {Authorization: `Bearer ${jwtToken}`},
      method: 'GET',
    }

    const response = await fetch(apiUrl, options)
    const data = await response.json()

    if (response.ok === true) {
      this.setState({
        jobsList: data.jobs,
        jobsApiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({jobsApiStatus: apiStatusConstants.failure})
    }
  }

  renderProfile = () => {
    const {profileApiStatus, profileData} = this.state

    switch (profileApiStatus) {
      case apiStatusConstants.inProgress:
        return this.renderLoader()
      case apiStatusConstants.success:
        return (
          <div className="profile-container">
            <img
              src={profileData.profile_image_url}
              alt="profile"
              className="profile-img"
            />
            <h1 className="profile-name">{profileData.name}</h1>
            <p className="profile-bio">{profileData.short_bio}</p>
          </div>
        )
      case apiStatusConstants.failure:
        return (
          <div className="profile-failure">
            <button
              type="button"
              onClick={this.getProfile}
              className="retry-btn"
            >
              Retry
            </button>
          </div>
        )
      default:
        return null
    }
  }

  renderLoader = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderJobsFailureView = () => (
    <div className="failure-view">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className="failure-img"
      />
      <h1 className="failure-heading">Oops! Something Went Wrong</h1>
      <p className="failure-description">
        We cannot seem to find the page you are looking for
      </p>
      <button type="button" onClick={this.getJobs} className="retry-btn">
        Retry
      </button>
    </div>
  )

  renderNoJobsView = () => (
    <div className="no-jobs-view">
      <img
        src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
        alt="no jobs"
        className="no-jobs-img"
      />
      <h1 className="no-jobs-heading">No Jobs Found</h1>
      <p className="no-jobs-description">
        We could not find any jobs. Try other filters.
      </p>
    </div>
  )

  renderJobsList = () => {
    const {jobsList, locationFilters} = this.state

    // Client-side location filtering
    const filteredJobs =
      locationFilters.length === 0
        ? jobsList
        : jobsList.filter(job => locationFilters.includes(job.location))

    if (filteredJobs.length === 0) {
      return this.renderNoJobsView()
    }

    return (
      <ul className="jobs-list">
        {filteredJobs.map(job => (
          <JobCard jobDetails={job} key={job.id} />
        ))}
      </ul>
    )
  }

  renderJobs = () => {
    const {jobsApiStatus} = this.state

    switch (jobsApiStatus) {
      case apiStatusConstants.inProgress:
        return this.renderLoader()
      case apiStatusConstants.success:
        return this.renderJobsList()
      case apiStatusConstants.failure:
        return this.renderJobsFailureView()
      default:
        return null
    }
  }

  onChangeSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  onClickSearch = () => {
    this.getJobs()
  }

  onKeyDownSearch = event => {
    if (event.key === 'Enter') {
      this.getJobs()
    }
  }

  updateEmploymentType = id => {
    this.setState(
      prevState => ({
        employmentType: prevState.employmentType.includes(id)
          ? prevState.employmentType.filter(each => each !== id)
          : [...prevState.employmentType, id],
      }),
      this.getJobs,
    )
  }

  updateSalaryRange = id => {
    this.setState({minimumPackage: id}, this.getJobs)
  }

  updateLocation = id => {
    this.setState(prevState => ({
      locationFilters: prevState.locationFilters.includes(id)
        ? prevState.locationFilters.filter(each => each !== id)
        : [...prevState.locationFilters, id],
    }))
  }

  render() {
    const {searchInput} = this.state

    return (
      <>
        <Header />
        <div className="jobs-container">
          <div className="filters-section">
            {this.renderProfile()}
            <hr className="sidebar-separator" />
            <FiltersGroup
              employmentTypesList={employmentTypesList}
              salaryRangesList={salaryRangesList}
              locationsList={locationsList}
              updateEmploymentType={this.updateEmploymentType}
              updateSalaryRange={this.updateSalaryRange}
              updateLocation={this.updateLocation}
            />
          </div>

          <div className="jobs-section">
            <div className="search-container">
              <input
                type="search"
                value={searchInput}
                onChange={this.onChangeSearchInput}
                onKeyDown={this.onKeyDownSearch}
                className="search-input"
                placeholder="Search"
              />
              <button
                type="button"
                data-testid="searchButton"
                onClick={this.onClickSearch}
                className="search-btn"
              >
                <BsSearch />
              </button>
            </div>

            {this.renderJobs()}
          </div>
        </div>
      </>
    )
  }
}

export default Jobs
