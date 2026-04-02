import {Link} from 'react-router-dom'
import './index.css'

const JobCard = props => {
  const {jobDetails} = props

  const {
    id,
    title,
    rating,
    location,
    employment_type: employmentType,
    package_per_annum: packagePerAnnum,
    company_logo_url: companyLogoUrl,
    job_description: jobDescription,
  } = jobDetails

  return (
    <li className="job-item">
      <Link to={`/jobs/${id}`} className="job-link">
        <div className="job-card-header">
          <img
            src={companyLogoUrl}
            alt="company logo"
            className="company-logo"
          />
          <div>
            <h1 className="job-title">{title}</h1>
            <p>⭐ {rating}</p>
          </div>
        </div>

        <div className="job-details">
          <p>{location}</p>
          <p>{employmentType}</p>
          <p className="package">{packagePerAnnum}</p>
        </div>

        <hr className="separator" />

        <h1 className="description-heading">Description</h1>
        <p className="job-description">{jobDescription}</p>
      </Link>
    </li>
  )
}

export default JobCard
