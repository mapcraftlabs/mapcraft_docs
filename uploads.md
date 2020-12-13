# Upload Documentation

This is where documentation on shapefile uploads is kept.

### Shapefile types and limits

For small shapefiles, currently set to 250MB (though subject to change), you map upload standard geojson files or geocsv files.

For larger shapefiles, you must upload sorted csv files so that the file can be streamed after uploading (geojson files require parsing the entire file into memory, while csv files are line-by-line).  The sort order does not matter, but all split_key values must be contiguous in the file and an error will be returned if they are not.  Zip files are also not uploadable as they are also not streamable.

Sorted geocsv files up to 500MB or so are allowed by any user in the app, but the hard limit is much higher than this.  A MapCraft employee can work with you to upload larger files.

### Geocsv format

Geocsv is a standard csv file where one of the columns is titled "geometry".  This column should contain either a wkt or geojson geometry column.

Here is an example csv format with wkt geometry:

```csv
apn,taz,dnt,zone_id,landval,impval,ceval,totval,comm_tot_s,res_tot_sq,condo_avg_rent,hotelcasino_avg_rent,hotelnocasino_avg_rent,ind_avg_rent,ind_avg_vac,mf_avg_rent,mf_avg_vac,off_avg_rent,off_avg_vac,ret_avg_rent,ret_avg_vac,sf_avg_rent,shpcntr_avg_rent,shpcntr_avg_vac,grpqtr_population,population,total_population,dwelling_units,occupied_hh,total_emp,hotel_g_emp,hotel_ng_emp,constru_emp,goods_p_emp,ware_h_emp,food_dr_emp,super_c_emp,retail_emp,office_g_emp,office_p_emp,medical_emp,other_emp,school_emp,open_s_emp,nafb_emp,mia_emp,mia_pass,ivph_emp,ivph_pass,unlv_main_emp,unlv_main_enroll,unlv_nlv_emp,unlv_nlv_enroll,nv_state_college_emp,nv_state_college_enroll,school_f18_enroll,school_f912_enroll,college_f13_enroll,college_f13_emp,conv_space,geometry
12602501011,10,0,lasv_pd0,72380.0,0.0,0.0,72380.0,0.0,0.0,195.9499969482422,50.0,0.0,0.0,0.0,1.2699999809265137,7.739999771118164,24.54999923706055,14.789999961853027,33.0,50.0,149.62793626456425,16.799999237060547,11.449999809265135,0.0,0.0,0.0,0.0,0.0,0.029788018825712005,0.0,0.0,0.0,0.0,0.0,0.012320187966408,0.0,0.017467830859304,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0,0,0.0,0.0,0,0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,"POLYGON ((-115.3330416706146 36.33618379162061, -115.3330945268593 36.33428239044297, -115.3342273456683 36.3342839790928, -115.3342014395147 36.33523436297509, -115.3341756613228 36.33618002520931, -115.3341755817989 36.33618295958073, -115.3341755326635 36.336184746698, -115.3330416479514 36.33618460812433, -115.3330416706146 36.33618379162061))"
```

Here is the same example csv format with geojson geometry:

```csv
apn,taz,dnt,zone_id,landval,impval,ceval,totval,comm_tot_s,res_tot_sq,condo_avg_rent,hotelcasino_avg_rent,hotelnocasino_avg_rent,ind_avg_rent,ind_avg_vac,mf_avg_rent,mf_avg_vac,off_avg_rent,off_avg_vac,ret_avg_rent,ret_avg_vac,sf_avg_rent,shpcntr_avg_rent,shpcntr_avg_vac,grpqtr_population,population,total_population,dwelling_units,occupied_hh,total_emp,hotel_g_emp,hotel_ng_emp,constru_emp,goods_p_emp,ware_h_emp,food_dr_emp,super_c_emp,retail_emp,office_g_emp,office_p_emp,medical_emp,other_emp,school_emp,open_s_emp,nafb_emp,mia_emp,mia_pass,ivph_emp,ivph_pass,unlv_main_emp,unlv_main_enroll,unlv_nlv_emp,unlv_nlv_enroll,nv_state_college_emp,nv_state_college_enroll,school_f18_enroll,school_f912_enroll,college_f13_enroll,college_f13_emp,conv_space,geometry
12602501011,10,0,lasv_pd0,72380.0,0.0,0.0,72380.0,0.0,0.0,195.9499969482422,50.0,0.0,0.0,0.0,1.2699999809265137,7.739999771118164,24.54999923706055,14.789999961853027,33.0,50.0,149.62793626456425,16.799999237060547,11.449999809265135,0.0,0.0,0.0,0.0,0.0,0.029788018825712005,0.0,0.0,0.0,0.0,0.0,0.012320187966408,0.0,0.017467830859304,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0,0,0.0,0.0,0,0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,"{""coordinates"": [[[-115.333042, 36.336184], [-115.333095, 36.334282], [-115.334227, 36.334284], [-115.334201, 36.335234], [-115.334176, 36.33618], [-115.334176, 36.336183], [-115.334176, 36.336185], [-115.333042, 36.336185], [-115.333042, 36.336184]]], ""type"": ""Polygon""}"
```

### Shape count limits for single layers and splitting

Only roughly 7k shapes or so can be rendered in a single shapefile or study area.  However Labs supports much larger files than this by splitting files based on a `split_key` attribute in the file.  All shapes with the same `split_key` will be put into a study area together.  Labs now splits files for you - simply set the switch to "Multiple study areas" when creating a layer and include an attribute that can serve as the split key (you will be asked to pick the attribute name to split on).

There is no practical limit to the number of total shapes that can be included in a split Lab - the largest shapefile to date included most of the parcels in the state of California.

### Lookup tables

Small non-spatial lookup tables are also supported for csv upload.  These files do not need to contain a geometry column and will not be rendered on the map.  Set the switch to "Lookup table" to upload a file of this type.
