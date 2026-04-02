import './index.css'

const SimilarJobItem = props => {
  const {jobDetails} = props
  const {
    companyLogoUrl,
    title,
    rating,
    location,
    employmentType,
    jobDescription,
  } = jobDetails

  return (
    <li className="similar-job-card">
      <img
        src={companyLogoUrl}
        alt="similar job company logo"
        className="similar-logo"
      />
      <h1 className="similar-title">{title}</h1>
      <p>⭐ {rating}</p>

      <h1 className="similar-sub-heading">Description</h1>
      <p className="similar-description">{jobDescription}</p>

      <div className="similar-meta">
        <p>{location}</p>
        <p>{employmentType}</p>
      </div>
    </li>
  )
}

export default SimilarJobItem
