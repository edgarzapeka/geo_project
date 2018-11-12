### Building Features

- [x] React Component
- [x] Mapbox GL Integration
- [x] Charting Data
- [x] API & Database

### Notes

* While implementing features tried to be consistent and make as few as possible changes.
* Haven't figured out yet how to solve console error **Error: Source "1" cannot be removed while layer "1" is using it.** but will look into it more some time later. **UPDATE. Fixed now :+1: the issue was with source at componentWillUnmount point. It tried to remove the source without checking for existing layer**
* Removed lines of code which used mock data, so the database connection is required 
