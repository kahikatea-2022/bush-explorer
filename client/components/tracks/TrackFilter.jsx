import React, { useState } from 'react'

function TrackFilter({ filter, updateFilter, filterName }) {
  const [filterItems, setFilterItems] = useState(['Select All', ...filter])
  const [filterOptions, setFilterOptions] = useState([...filter])
  const [showFilter, setShowFilter] = useState(false)

  function handleSelect(filterValueClicked, isSelected) {
    switch (filterValueClicked) {
      case 'Select All':
        isSelected ? updateFilter([]) : updateFilter(filterOptions)
        break

      default:
        updateFilter(
          isSelected
            ? filter.filter((filterValue) => filterValue !== filterValueClicked)
            : [...filter, filterValueClicked]
        )
        break
    }
  }

  function handleClick() {
    setShowFilter((prevState) => !prevState)
  }

  return (
    <div>
      <div>
        <button onClick={handleClick}>{filterName}</button>
      </div>
      {showFilter && (
        <div>
          {filterItems.map((filterValue, index) => {
            const isSelected =
              filterValue === 'Select All'
                ? filter.length === 3
                : filter.includes(filterValue)
            return (
              <div key={index}>
                <label>{filterValue}</label>‍
                <input
                  type="checkbox"
                  checked={isSelected}
                  onChange={() => {
                    handleSelect(filterValue, isSelected)
                  }}
                />
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

export default TrackFilter