# Uploading "Base" Data 

This is where documentation on shapefile uploads is kept.  As of spring 2024, spatial csvs are no longer allowed.

## Shapefile types and limits

For small shapefiles, up to 300MB, you may upload standard geojson and zipped geojson files as supported by [geopandas.from_file](https://geopandas.readthedocs.io/en/latest/docs/reference/api/geopandas.GeoDataFrame.from_file.html).  For larger shapefiles, up to 1GB (though larger uploads are allowed by special request), the required file format is parquet (it should be readable by [pandas.read_parquet](https://pandas.pydata.org/docs/reference/api/pandas.read_parquet.html)).

## Why are types useful?

Removing spatial csv has happened in order to encode types natively in all encouraged file formats (geojson and parquet), which allows consistent encoding of strings where appropriate.  The biggest problem this solves is to always read FIPS codes as strings with leading zero characters (i.e. California as '06'), which python/pandas does not support without remembering to pass the dtype parameter to read_csv every time.  With parquet instead of csv, this process is less error prone.

## What is parquet?

Support for [parquet](https://www.linkedin.com/pulse/perfect-file-format-unveiled-parquet-vs-csv-shailendra-prajapati/) is now ubiquitous and it's clear it will take over in use cases where csv used to be popular.  In short, it's a tabular format that encodes data types in the file (mainly numeric vs. string, but other types as well).  When using python/pandas you can also encode columns as categorical and set the index appropriately, and the app will use this information to configure the project.  Parquet is smaller (and includes compression in the file format, which is supported), and parses faster than csv and zipped csv.

Geoparquet is a flavor of parquet which we support, but is not required.  In short, we require parquet files to have a column named geometry which is either in WKT or WKB format (either is fine, we will autodetect).

## R support

R also supports parquet, but the indication of categorical column and index values is specific to the language.  It's not something we've tested much, but we encourage someone to try it and fill out this section of the documentation.  We're happy to increase our support for R parquet files where appropriate.

## Lookup tables

Small non-spatial lookup tables are still supported for csv upload.  These files do not need to contain a geometry column and will not be rendered on the map.  Set the switch to "Lookup table" to upload a file of this type.
