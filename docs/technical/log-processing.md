---
sidebar_position: 3
---

# Log processing

Whenever a log is sent to the server with the correct [Protocol](./protocol.md), it will run be processed with the following procedure.

## Metadata collected

- Earliest log line timestamp
- Latest log line timestamp
- Count of lines per category
- Count of lines per severity

Or in Go representation:

```go
type logChunkMetadata struct {
	Start           time.Time
	End             time.Time
	LineCount       int32
	CategoriesCount map[string]int // Used to get a string[] of categories
	SeveritiesCount map[string]int
}
```

## Procedure

The log is processed in O(1) complexity, reading one character at a time.

A buffer is built with all line characters until encountering a `\n`. The line buffer is then used to extract metadata for that specific line. The metadata collected is:

```go
type logChunkLineMetadata struct {
	Timestamp time.Time
	Category  string
	Severity  string
}
```

If a line cannot be processed due to invalid format (as described in [Protocol](./protocol.md)), the line is still counted, to make sure that absolute line numbers remain correct when filtering. A line is deemed invalid if there is an error parsing, or if any of the fields is empty.

After line processing, the metadata is added to `logChunkMetadata`. The `LineCount` is incremented regardless of whether the metadata for a line could be extracted. The other fields are only updated when all metadata fields are set.

## Storage

After metadata is collected, the original log chunk is saved to blob storage. The contents remain unmodified. This ensures no data loss in case of a processing error.

## Filtering logs

When requesting logs without any filters, there is no filtering logic applied and all chunks will be streamed, in chronological order

When filters are set, the same extraction algorithm for incoming chunks is used for performance, and logs are streamed to the client whenever a chunk is done processing, to show the first lines as soon as possible.

Chunk metadata from the database is used to determine if a chunk contains any lines that should be sent. If there are no matches, the chunk is not loaded from blobstorage.

## Performance

Due to the per-character algorithm for log chunk processing, it allows the server to be very performant with extracting the metadata.

The current benchmarks for extracting metadata from a 100.000-line incoming log chunk (which is much larger than what can be expected in a production setting) is around 60ms.

The benchmark for filtering lines from a 100.000-line chunk for streaming to a user (as is used for the admin panel) is around 70ms.
