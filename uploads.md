# Upload Documentation

This is where documentation on shapefile uploads is kept.  Major changes for Labs best practices have occurred in the summer of 2023.

### Shapefile types and limits

For small shapefiles, up to 300MB, you may upload standard geojson and zipped geojson files as supported by [geopandas.from_file](https://geopandas.readthedocs.io/en/latest/docs/reference/api/geopandas.GeoDataFrame.from_file.html).  For larger shapefiles, up to 1GB (though larger uploads are allowed by special request), the preferred file format is now parquet (it should be readable by [pandas.read_parquet](https://pandas.pydata.org/docs/reference/api/pandas.read_parquet.html)).

### Why are types useful?

The change in best practices has happened in order to encode types natively in all encouraged file formats (geojson and parquet), which allows consistent encoding of strings where appropriate.  The biggest problem this solves is to always read FIPS codes as strings with leading zero characters (i.e. California as '06'), which python/pandas does not support without remembering to pass the dtype parameter to read_csv every time.  With parquet instead of csv, this process is less error prone.

### What is parquet?

Support for [parquet](https://www.linkedin.com/pulse/perfect-file-format-unveiled-parquet-vs-csv-shailendra-prajapati/) is now ubiquitous and it's clear it will take over in use cases where csv used to be popular.  In short, it's a tabular format that encodes data types in the file (mainly numeric vs. string, but other types as well).  When using python/pandas you can also encode columns as categorical and set the index appropriately, and Labs will use this information to configure the Lab.  Parquet is smaller (and includes compression in the file format, which is supported), and parses faster than csv and zipped csv.

Geoparquet is a flavor of parquet which we support, but is not required.  In short, we require parquet files to have a column named geometry which is either in WKT or WKB format (either is fine, we will autodetect).

### R support

R also supports parquet, but the indication of categorical column and index values is specific to the language.  It's not something we've tested much, but we encourage someone to try it and fill out this section of the documentation.  We're happy to increase our support for R parquet files where appropriate.

### GeoCSV format (deprecated but not removed until 2024)

GeoCSV is a standard csv file where one of the columns is titled "geometry". This column should contain a WKT geometry column named "geometry" in WGS 84 coordinate system (EPSG:4326). Others are not currently supported.

Here is an example of GeoCSV format:

```csv
apn,taz,dnt,zone_id,landval,impval,ceval,totval,comm_tot_s,res_tot_sq,condo_avg_rent,hotelcasino_avg_rent,hotelnocasino_avg_rent,ind_avg_rent,ind_avg_vac,mf_avg_rent,mf_avg_vac,off_avg_rent,off_avg_vac,ret_avg_rent,ret_avg_vac,sf_avg_rent,shpcntr_avg_rent,shpcntr_avg_vac,grpqtr_population,population,total_population,dwelling_units,occupied_hh,total_emp,hotel_g_emp,hotel_ng_emp,constru_emp,goods_p_emp,ware_h_emp,food_dr_emp,super_c_emp,retail_emp,office_g_emp,office_p_emp,medical_emp,other_emp,school_emp,open_s_emp,nafb_emp,mia_emp,mia_pass,ivph_emp,ivph_pass,unlv_main_emp,unlv_main_enroll,unlv_nlv_emp,unlv_nlv_enroll,nv_state_college_emp,nv_state_college_enroll,school_f18_enroll,school_f912_enroll,college_f13_enroll,college_f13_emp,conv_space,geometry
12602501011,10,0,lasv_pd0,72380.0,0.0,0.0,72380.0,0.0,0.0,195.9499969482422,50.0,0.0,0.0,0.0,1.2699999809265137,7.739999771118164,24.54999923706055,14.789999961853027,33.0,50.0,149.62793626456425,16.799999237060547,11.449999809265135,0.0,0.0,0.0,0.0,0.0,0.029788018825712005,0.0,0.0,0.0,0.0,0.0,0.012320187966408,0.0,0.017467830859304,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0,0,0.0,0.0,0,0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,"POLYGON ((-115.3330416706146 36.33618379162061, -115.3330945268593 36.33428239044297, -115.3342273456683 36.3342839790928, -115.3342014395147 36.33523436297509, -115.3341756613228 36.33618002520931, -115.3341755817989 36.33618295958073, -115.3341755326635 36.336184746698, -115.3330416479514 36.33618460812433, -115.3330416706146 36.33618379162061))"
```

### Conversion from csv to parquet

To convert from csv to parquet in python/pandas, simply run `pandas.read_csv(in_filename).to_parquet(out_filename)`.  It's often smart to *set the data types* between the two steps, which will then be consistently stored in the parquet file, i.e. to pass dtype to `read_csv` and to convert certain columns to categorical and to set the index as appropriate.

**Conversion from other spatial formats**

GDAL ([ogr2ogr](https://gdal.org/programs/ogr2ogr.html)) provides a simple script to convert from [all GDAL supported formats](https://gdal.org/drivers/vector/index.html) to [GeoCSV](https://gdal.org/drivers/vector/csv.html#vector-csv).

Examples:

- From GeoJSON

    `ogr2ogr -f CSV output.csv input.geojson -lco GEOMETRY=AS_WKT -lco GEOMETRY_NAME=geometry -lco CREATE_CSVT=YES`

- From Shapefile

    `ogr2ogr -f CSV output.csv input.shp -lco GEOMETRY=AS_WKT -lco GEOMETRY_NAME=geometry -lco CREATE_CSVT=YES`

### Zipped csv format (deprecated but will not be removed until 2024)

For larger files, zipped csvs are recommended.  Simply zip up a single file with a ".csv" ending.  Non-".csv" files can be in the zip file, but only one ".csv" file is allowed.

### Lookup tables

Small non-spatial lookup tables are also supported for csv upload.  These files do not need to contain a geometry column and will not be rendered on the map.  Set the switch to "Lookup table" to upload a file of this type.
