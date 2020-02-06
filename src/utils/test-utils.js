// // test-utils.js
// import { render, queries } from '@testing-library/react'
// import { queryHelpers, buildQueries } from '@testing-library/react'
//
// // The queryAllByAttribute is a shortcut for attribute-based matchers
// // You can also use document.querySelector or a combination of existing
// // testing library utilities to find matching nodes for your query
// const queryAllByDataCy = (...args) =>
//     queryHelpers('data-cy', ...args)
//
// const getMultipleError = (c, dataCyValue) =>
//     `Found multiple elements with the data-cy attribute of: ${dataCyValue}`
//
// const getMissingError = (c, dataCyValue) =>
//     `Unable to find an element with the data-cy attribute of: ${dataCyValue}`
//
// const customQueries = buildQueries(queryAllByDataCy, getMultipleError, getMissingError)
//
// const customRender = (ui, options) =>
//     render(ui, { queries: { ...queries, ...customQueries }, ...options })
//
// // re-export everything
// export * from '@testing-library/react'
//
// // override render method
// export { customRender as render }