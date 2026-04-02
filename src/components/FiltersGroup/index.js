import './index.css'

const FiltersGroup = props => {
  const {
    employmentTypesList,
    salaryRangesList,
    locationsList,
    updateEmploymentType,
    updateSalaryRange,
    updateLocation,
  } = props

  return (
    <div className="filters-group-container">
      <h1 className="filter-heading">Type of Employment</h1>
      <ul className="filter-list">
        {employmentTypesList.map(each => (
          <li key={each.employmentTypeId} className="filter-item">
            <input
              type="checkbox"
              id={each.employmentTypeId}
              className="filter-checkbox"
              onChange={() => updateEmploymentType(each.employmentTypeId)}
            />
            <label htmlFor={each.employmentTypeId} className="filter-label">
              {each.label}
            </label>
          </li>
        ))}
      </ul>

      <hr className="filter-separator" />

      <h1 className="filter-heading">Salary Range</h1>
      <ul className="filter-list">
        {salaryRangesList.map(each => (
          <li key={each.salaryRangeId} className="filter-item">
            <input
              type="radio"
              name="salary"
              id={each.salaryRangeId}
              className="filter-checkbox"
              onChange={() => updateSalaryRange(each.salaryRangeId)}
            />
            <label htmlFor={each.salaryRangeId} className="filter-label">
              {each.label}
            </label>
          </li>
        ))}
      </ul>

      <hr className="filter-separator" />

      <h1 className="filter-heading">Location</h1>
      <ul className="filter-list">
        {locationsList.map(each => (
          <li key={each.locationId} className="filter-item">
            <input
              type="checkbox"
              id={each.locationId}
              className="filter-checkbox"
              onChange={() => updateLocation(each.locationId)}
            />
            <label htmlFor={each.locationId} className="filter-label">
              {each.label}
            </label>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default FiltersGroup
