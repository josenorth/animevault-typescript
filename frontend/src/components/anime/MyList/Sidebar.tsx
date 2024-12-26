// import React from "react"
// import { TextField, Select, MenuItem, InputLabel, FormControl } from "@mui/material"

// const Sidebar = ({ selectedList, setSelectedList }) => {
//   return (
//     <div className="w-64 bg-gray-900 mb-32 mt-32 p-2 hidden md:block">
//       <TextField 
//         label="Filter" 
//         variant="outlined" 
//         fullWidth 
//         className="mb-2" 
//         sx={{
//           input: { color: "white" },
//           label: { color: "white" },
//           '& .MuiOutlinedInput-root': {
//             '& fieldset': {
//               borderColor: 'white',
//             },
//             '&:hover fieldset': {
//               borderColor: 'white',
//             },
//             '&.Mui-focused fieldset': {
//               borderColor: 'white',
//             },
//           }
//         }}
//       />

//       <div className="space-y-4 mt-4">
//         <FormControl fullWidth>
//           <InputLabel id="list-select-label" sx={{ color: "white" }}>Select list</InputLabel>
//           <Select
//             labelId="list-select-label"
//             value={selectedList}
//             onChange={(e) => setSelectedList(e.target.value)}
//             label="Select list"
//             sx={{
//               color: "white",
//               '& .MuiOutlinedInput-notchedOutline': {
//                 borderColor: 'white',
//               },
//               '&:hover .MuiOutlinedInput-notchedOutline': {
//                 borderColor: 'white',
//               },
//               '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
//                 borderColor: 'white',
//               },
//             }}
//           >
//             <MenuItem value="All">All</MenuItem>
//             <MenuItem value="Watching">Watching</MenuItem>
//             <MenuItem value="Completed">Completed</MenuItem>
//             <MenuItem value="Paused">Paused</MenuItem>
//             <MenuItem value="Planning">Planning</MenuItem>
//             <MenuItem value="Invierno 2024">Invierno 2024</MenuItem>
//           </Select>
//         </FormControl>

//         <FormControl fullWidth>
//             <InputLabel id="format-select-label" sx={{ color: "white" }}>Format</InputLabel>
//             <Select
//               labelId="format-select-label"
//               value=""
//               label="Format"
//               sx={{
//                 color: "white",
//                 '& .MuiOutlinedInput-notchedOutline': {
//                   borderColor: 'white',
//                 },
//                 '&:hover .MuiOutlinedInput-notchedOutline': {
//                   borderColor: 'white',
//                 },
//                 '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
//                   borderColor: 'white',
//                 },
//               }}
//             >
//               <MenuItem value="TV">TV</MenuItem>
//               <MenuItem value="Movie">Movie</MenuItem>
//               <MenuItem value="OVA">OVA</MenuItem>
//             </Select>
//           </FormControl>

//           <FormControl fullWidth>
//             <InputLabel id="status-select-label" sx={{ color: "white" }}>Status</InputLabel>
//             <Select
//               labelId="status-select-label"
//               value=""
//               label="Status"
//               sx={{
//                 color: "white",
//                 '& .MuiOutlinedInput-notchedOutline': {
//                   borderColor: 'white',
//                 },
//                 '&:hover .MuiOutlinedInput-notchedOutline': {
//                   borderColor: 'white',
//                 },
//                 '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
//                   borderColor: 'white',
//                 },
//               }}
//             >
//               <MenuItem value="Airing">Airing</MenuItem>
//               <MenuItem value="Finished">Finished</MenuItem>
//             </Select>
//           </FormControl>

//           <FormControl fullWidth>
//             <InputLabel id="genres-select-label" sx={{ color: "white" }}>Genres</InputLabel>
//             <Select
//               labelId="genres-select-label"
//               value=""
//               label="Genres"
//               sx={{
//                 color: "white",
//                 '& .MuiOutlinedInput-notchedOutline': {
//                   borderColor: 'white',
//                 },
//                 '&:hover .MuiOutlinedInput-notchedOutline': {
//                   borderColor: 'white',
//                 },
//                 '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
//                   borderColor: 'white',
//                 },
//               }}
//             >
//               <MenuItem value="Action">Action</MenuItem>
//               <MenuItem value="Comedy">Comedy</MenuItem>
//               <MenuItem value="Drama">Drama</MenuItem>
//               <MenuItem value="Romance">Romance</MenuItem>
//             </Select>
//           </FormControl>

//           <FormControl fullWidth>
//             <InputLabel id="country-select-label" sx={{ color: "white" }}>Country</InputLabel>
//             <Select
//               labelId="country-select-label"
//               value=""
//               label="Country"
//               sx={{
//                 color: "white",
//                 '& .MuiOutlinedInput-notchedOutline': {
//                   borderColor: 'white',
//                 },
//                 '&:hover .MuiOutlinedInput-notchedOutline': {
//                   borderColor: 'white',
//                 },
//                 '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
//                   borderColor: 'white',
//                 },
//               }}
//             >
//               <MenuItem value="Japan">Japan</MenuItem>
//               <MenuItem value="China">China</MenuItem>
//               <MenuItem value="Korea">Korea</MenuItem>
//             </Select>
//           </FormControl>

//           <FormControl fullWidth>
//             <InputLabel id="year-select-label" sx={{ color: "white" }}>Year</InputLabel>
//             <Select
//               labelId="year-select-label"
//               value=""
//               label="Year"
//               sx={{
//                 color: "white",
//                 '& .MuiOutlinedInput-notchedOutline': {
//                   borderColor: 'white',
//                 },
//                 '&:hover .MuiOutlinedInput-notchedOutline': {
//                   borderColor: 'white',
//                 },
//                 '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
//                   borderColor: 'white',
//                 },
//               }}
//             >
//               <MenuItem value="2024">2024</MenuItem>
//               <MenuItem value="2023">2023</MenuItem>
//               <MenuItem value="2022">2022</MenuItem>
//             </Select>
//           </FormControl>

//           <FormControl fullWidth>
//             <InputLabel id="sort-select-label" sx={{ color: "white" }}>Sort</InputLabel>
//             <Select
//               labelId="sort-select-label"
//               value=""
//               label="Sort"
//               sx={{
//                 color: "white",
//                 '& .MuiOutlinedInput-notchedOutline': {
//                   borderColor: 'white',
//                 },
//                 '&:hover .MuiOutlinedInput-notchedOutline': {
//                   borderColor: 'white',
//                 },
//                 '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
//                   borderColor: 'white',
//                 },
//               }}
//             >
//               <MenuItem value="Score">Score</MenuItem>
//               <MenuItem value="Title">Title</MenuItem>
//               <MenuItem value="Progress">Progress</MenuItem>
//             </Select>
//           </FormControl>
//         </div>
//       </div>
//   );
// };

// export default Sidebar;