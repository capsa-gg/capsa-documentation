---
sidebar_position: 3
---

# Log processing

Whenever a log is sent to the server with the correct [Protocol]("./protocol.md"), it will run be processed with the following procedure.

## Metadata collected

- Earliest log line timestamp
- Latest log line timestamp
- List of categories
- Count of lines per category
- Count of lines per severity

## Procedure, O(1) complexity

- Generate an empty `LineMetadata` struct
- Start parsing the line per character, filling the `LineMetadata`
- Stop when encountering a new-line character
- Validate the `LineMetadata` structure
  - In case there is an error: log to stderr
- Update the `LogChunkMetadata` with the `LineMetadata`
- Discard the `LineMetadata struct`

After the procedure, the data is stored in the datavase and the blob of the data is stored without modification to the blob storage as described in [Systems]("./systems.md").

## Structure for `LineMetadata`

```go
type LineMetadata struct {
	Timestamp time.Timestamp
	Category string
	Severity string
}
```

## Structure for `LogChunkMetadata`

```go
type LogChunkMetadata struct {
	Start time.Timestamp
	End time.Timestamp
	CategoriesCount map[string]int // Used to get a string[] of categories
	SeveritiesCount map[string]int
}
```
