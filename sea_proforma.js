var PROFORMA_INPUTS = [
    {
        "Variable": "Land Value ($)",
        "Group": "Parcel Attributes",
        "Value": "1000000",
        "Theme?": "Yes",
        "NmbrFmt": "0.00M",
        "Type": "float",
        "InternalName": "Land Value",
        "Layer": "Parcel",
        "cellAddr": "ProForma_C3",
        "npType": "double"
    },
    {
        "Variable": "Improvement Value ($)",
        "Group": "Parcel Attributes",
        "Value": "1250000",
        "NmbrFmt": "0.00M",
        "Theme?": "Yes",
        "Type": "float",
        "InternalName": "Improvement Value",
        "Layer": "Parcel",
        "cellAddr": "ProForma_C4",
        "npType": "double"
    },
    {
        "Variable": "Land Use",
        "Group": "Parcel Attributes",
        "Value": "Text",
        "Theme?": "Yes",
        "NmbrFmt": "Text",
        "Type": "string",
        "InternalName": "Land Use",
        "Layer": "Parcel",
        "cellAddr": "ProForma_C5",
        "npType": "string"
    },
    {
        "Variable": "Parcel Size (sq ft)",
        "Group": "Parcel Attributes",
        "Value": "10000",
        "NmbrFmt": "0.0k",
        "Theme?": "No",
        "Type": "float",
        "InternalName": "Parcel Size",
        "Layer": "Parcel",
        "cellAddr": "ProForma_C6",
        "npType": "double"
    },
    {
        "Variable": "Residential Vacancy Rate (%)",
        "Group": "Market Metrics",
        "Value": "0.1",
        "Theme?": "Yes",
        "Type": "percent",
        "InternalName": "Residential Vacancy Rate",
        "Layer": "Neighborhood",
        "cellAddr": "ProForma_C7",
        "npType": "double"
    },
    {
        "Variable": "Residential Market Rent ($/sq ft)",
        "Group": "Market Metrics",
        "Value": "4",
        "Theme?": "Yes",
        "Type": "float",
        "InternalName": "Residential Market Rent",
        "Layer": "Neighborhood",
        "cellAddr": "ProForma_C8",
        "npType": "double"
    },
    {
        "Variable": "Rent Restricted Units (% of total)",
        "Group": "Affordable Housing",
        "Value": "0.2",
        "Theme?": "Yes",
        "Type": "percent",
        "InternalName": "Rent Restricted Units",
        "Layer": "Neighborhood",
        "cellAddr": "ProForma_C9",
        "npType": "double"
    },
    {
        "Variable": "Depth of Affordability (% Median Family Income)",
        "Group": "Affordable Housing",
        "Value": "0.8",
        "Theme?": "Yes",
        "Type": "percent",
        "InternalName": "Depth of Affordability",
        "Layer": "Neighborhood",
        "cellAddr": "ProForma_C10",
        "npType": "double"
    }
];

var PROFORMA_GLOBALS = [
    {
        "Variable": "HUD Median Family Income (4 person household)",
        "Group": "Affordable Housing",
        "Value": "73900",
        "Type": "float",
        "InternalName": "HUD Median Family Income",
        "cellAddr": "ProForma_C15",
        "npType": "double"
    },
    {
        "Variable": "Rent Restricted Units (% of total)",
        "Group": "Affordable Housing",
        "Value": "0.2",
        "NmbrFmt": "0%",
        "Type": "percent",
        "InternalName": "Rent Restricted Units",
        "cellAddr": "ProForma_C16",
        "npType": "double"
    },
    {
        "Variable": "Depth of Affordability (% Median Family Income)",
        "Group": "Affordable Housing",
        "Value": "0.8",
        "Type": "float",
        "InternalName": "Depth of Affordability",
        "cellAddr": "ProForma_C17",
        "npType": "double"
    },
    {
        "Variable": "Surface parking ($/stall)",
        "Group": "Parking Hard Costs",
        "Value": "7000",
        "Type": "float",
        "InternalName": "Surface parking",
        "cellAddr": "ProForma_C18",
        "npType": "double"
    },
    {
        "Variable": "Integrated deck ($/stall)",
        "Group": "Parking Hard Costs",
        "Value": "33000",
        "Type": "float",
        "InternalName": "Integrated deck",
        "cellAddr": "ProForma_C19",
        "npType": "double"
    },
    {
        "Variable": "Podium parking ($/stall)",
        "Group": "Parking Hard Costs",
        "Value": "30000",
        "Type": "float",
        "InternalName": "Podium parking",
        "cellAddr": "ProForma_C20",
        "npType": "double"
    },
    {
        "Variable": "Underground parking ($/stall)",
        "Group": "Parking Hard Costs",
        "Value": "40000",
        "Type": "float",
        "InternalName": "Underground parking",
        "cellAddr": "ProForma_C21",
        "npType": "double"
    },
    {
        "Variable": "Podium Residential ($/sq ft)",
        "Group": "Construction Hard Costs",
        "Value": "ProForma_C25",
        "Type": "float",
        "InternalName": "Podium Residential",
        "cellAddr": "ProForma_C22",
        "npType": "double"
    },
    {
        "Variable": "Lobby construction cost ($/sq ft)",
        "Group": "Construction Hard Costs",
        "Value": "165",
        "Type": "float",
        "InternalName": "Lobby construction cost",
        "cellAddr": "ProForma_C23",
        "npType": "double"
    },
    {
        "Variable": "Wood frame 3-story walkup ($/sq ft)",
        "Group": "Construction Hard Costs",
        "Value": "125",
        "Type": "float",
        "InternalName": "Wood frame 3-story walkup",
        "cellAddr": "ProForma_C24",
        "npType": "double"
    },
    {
        "Variable": "Wood frame 3-story wrap w/green roof ($/sq ft)",
        "Group": "Construction Hard Costs",
        "Value": "150",
        "Type": "float",
        "InternalName": "Wood frame 3-story wrap w-green roof",
        "cellAddr": "ProForma_C25",
        "npType": "double"
    },
    {
        "Variable": "Low-rise wood frame on podium ($/sq ft)",
        "Group": "Construction Hard Costs",
        "Value": "165",
        "Type": "float",
        "InternalName": "Low-rise wood frame on podium",
        "cellAddr": "ProForma_C26",
        "npType": "double"
    },
    {
        "Variable": "High-rise residential ($/sq ft)",
        "Group": "Construction Hard Costs",
        "Value": "210",
        "Type": "float",
        "InternalName": "High-rise residential",
        "cellAddr": "ProForma_C27",
        "npType": "double"
    },
    {
        "Variable": "Landscaping ($/sq ft)",
        "Group": "Construction Hard Costs",
        "Value": "5",
        "Type": "float",
        "InternalName": "Landscaping",
        "cellAddr": "ProForma_C28",
        "npType": "double"
    },
    {
        "Variable": "Plaza/Active Courtyard ($/sq ft)",
        "Group": "Construction Hard Costs",
        "Value": "30",
        "Type": "float",
        "InternalName": "Plaza-Active Courtyard",
        "cellAddr": "ProForma_C29",
        "npType": "double"
    },
    {
        "Variable": "Multifamily Operating Cost (% of rent)",
        "Group": "Other Costs",
        "Value": "0.3",
        "NmbrFmt": "0%",
        "Type": "percent",
        "InternalName": "Multifamily Operating Cost",
        "cellAddr": "ProForma_C30",
        "npType": "double"
    },
    {
        "Variable": "Hard Cost Contingency (% of other hard cost)",
        "Group": "Other Costs",
        "Value": "0.04",
        "NmbrFmt": "0.00%",
        "Type": "percent",
        "InternalName": "Hard Cost Contingency",
        "cellAddr": "ProForma_C31",
        "npType": "double"
    },
    {
        "Variable": "Soft Costs (% of hard costs)",
        "Group": "Other Costs",
        "Value": "0.25",
        "NmbrFmt": "0.00%",
        "Type": "percent",
        "InternalName": "Soft Costs",
        "cellAddr": "ProForma_C32",
        "npType": "double"
    },
    {
        "Variable": "Developer Fee (% of hard+soft costs)",
        "Group": "Other Costs",
        "Value": "0.04",
        "NmbrFmt": "0.00%",
        "Type": "percent",
        "InternalName": "Developer Fee",
        "cellAddr": "ProForma_C33",
        "npType": "double"
    },
    {
        "Variable": "CAP Rate (%)",
        "Group": "Investment Metrics",
        "Value": "0.045",
        "NmbrFmt": "0.00%",
        "Type": "percent",
        "InternalName": "CAP Rate",
        "cellAddr": "ProForma_C34",
        "npType": "double"
    },
    {
        "Variable": "Return on Cost Spread over CAP (%)",
        "Group": "Investment Metrics",
        "Value": "0.015",
        "NmbrFmt": "0.00%",
        "Type": "percent",
        "InternalName": "Return on Cost Spread over CAP",
        "cellAddr": "ProForma_C35",
        "npType": "double"
    },
    {
        "Variable": "Threshold for Feasibility (% Diff b/t Site Market Value and Resdidual Land Value)",
        "Group": "Investment Metrics",
        "Value": "0.1",
        "NmbrFmt": "0%",
        "Type": "percent",
        "InternalName": "Threshold for Feasibility",
        "cellAddr": "ProForma_C36",
        "npType": "double"
    }
];

var PROFORMA_OUTPUTS = [
    {
        "Variable": "Residual Land Value of Tower",
        "Value": "ProForma_B374",
        "Theme?": "Yes",
        "NmbrFmt": "$0,0.00",
        "Type": "float",
        "InternalName": "Residual Land Value of Tower",
        "cellAddr": "ProForma_B400",
        "npType": "double"
    },
    {
        "Variable": "Residual Land Value of 4 over 1 Podium",
        "Value": "ProForma_B375",
        "Theme?": "Yes",
        "NmbrFmt": "$0,0.00",
        "Type": "float",
        "InternalName": "Residual Land Value of 4 over 1 Podium",
        "cellAddr": "ProForma_B401",
        "npType": "double"
    },
    {
        "Variable": "Residual Land Value of Garden Walkups",
        "Value": "ProForma_B376",
        "Theme?": "Yes",
        "NmbrFmt": "$0,0.00",
        "Type": "float",
        "InternalName": "Residual Land Value of Garden Walkups",
        "cellAddr": "ProForma_B402",
        "npType": "double"
    },
    {
        "Variable": "Feasibility of Tower",
        "Value": "excel_if(ProForma_B374<0,-1,excel_if(ProForma_B379<ProForma_B371,0,1))",
        "Theme?": "Yes",
        "Type": "float",
        "InternalName": "Feasibility of Tower",
        "cellAddr": "ProForma_B403",
        "npType": "double"
    },
    {
        "Variable": "Feasibility of 4 over 1 Podium",
        "Value": "excel_if(ProForma_B375<0,-1,excel_if(ProForma_B380<ProForma_B371,0,1))",
        "Theme?": "Yes",
        "Type": "float",
        "InternalName": "Feasibility of 4 over 1 Podium",
        "cellAddr": "ProForma_B404",
        "npType": "double"
    },
    {
        "Variable": "Feasibility of Garden Walkups",
        "Value": "excel_if(ProForma_B376<0,-1,excel_if(ProForma_B381<ProForma_B371,0,1))",
        "Theme?": "Yes",
        "Type": "float",
        "InternalName": "Feasibility of Garden Walkups",
        "cellAddr": "ProForma_B405",
        "npType": "double"
    },
    {
        "Variable": "Most Feasible Option",
        "Value": "excel_if((ProForma_B403<1 && ProForma_B404<1 && ProForma_B405<1),\"N/A\",excel_if(ProForma_B384==1,ProForma_D379,excel_if(ProForma_B385==1,ProForma_D380,excel_if(ProForma_B386==1,ProForma_D381,\"Error\"))))",
        "Theme?": "Yes",
        "Type": "string",
        "InternalName": "Most Feasible Option",
        "cellAddr": "ProForma_B406",
        "npType": "string"
    },
    {
        "Variable": "Potential Units in Tower",
        "Value": "excel_if(ProForma_B403==1,(ProForma_B389+ProForma_B394)*ProForma_C6,0)",
        "Theme?": "Yes",
        "NmbrFmt": "0.0",
        "Type": "float",
        "InternalName": "Potential Units in Tower",
        "cellAddr": "ProForma_B407",
        "npType": "double"
    },
    {
        "Variable": "Potential Units in 4 over 1 Podium",
        "Value": "excel_if(ProForma_B404==1,(ProForma_B390+ProForma_B395)*ProForma_C6,0)",
        "Theme?": "Yes",
        "NmbrFmt": "0.0",
        "Type": "float",
        "InternalName": "Potential Units in 4 over 1 Podium",
        "cellAddr": "ProForma_B408",
        "npType": "double"
    },
    {
        "Variable": "Potential Units in Garden Walkups",
        "Value": "excel_if(ProForma_B405==1,(ProForma_B391+ProForma_B396)*ProForma_C6,0)",
        "Theme?": "Yes",
        "NmbrFmt": "0.0",
        "Type": "float",
        "InternalName": "Potential Units in Garden Walkups",
        "cellAddr": "ProForma_B409",
        "npType": "double"
    },
    {
        "Variable": "Potential Market-Rate Units in Tower",
        "Value": "excel_if(ProForma_B403==1,ProForma_B389*ProForma_C6,0)",
        "Theme?": "Yes",
        "NmbrFmt": "0.0",
        "Type": "float",
        "InternalName": "Potential Market-Rate Units in Tower",
        "cellAddr": "ProForma_B410",
        "npType": "double"
    },
    {
        "Variable": "Potential Market-Rate Units in 4 over 1 Podium",
        "Value": "excel_if(ProForma_B404==1,ProForma_B390*ProForma_C6,0)",
        "Theme?": "Yes",
        "NmbrFmt": "0.0",
        "Type": "float",
        "InternalName": "Potential Market-Rate Units in 4 over 1 Podium",
        "cellAddr": "ProForma_B411",
        "npType": "double"
    },
    {
        "Variable": "Potential Market-Rate Units in Garden Walkups",
        "Value": "excel_if(ProForma_B405==1,ProForma_B391*ProForma_C6,0)",
        "Theme?": "Yes",
        "NmbrFmt": "0.0",
        "Type": "float",
        "InternalName": "Potential Market-Rate Units in Garden Walkups",
        "cellAddr": "ProForma_B412",
        "npType": "double"
    },
    {
        "Variable": "Potential Affordable Units in Tower",
        "Value": "excel_if(ProForma_B403==1,ProForma_B394*ProForma_C6,0)",
        "Theme?": "Yes",
        "NmbrFmt": "0.0",
        "Type": "float",
        "InternalName": "Potential Affordable Units in Tower",
        "cellAddr": "ProForma_B413",
        "npType": "double"
    },
    {
        "Variable": "Potential Affordable Units in 4 over 1 Podium",
        "Value": "excel_if(ProForma_B404==1,ProForma_B395*ProForma_C6,0)",
        "Theme?": "Yes",
        "NmbrFmt": "0.0",
        "Type": "float",
        "InternalName": "Potential Affordable Units in 4 over 1 Podium",
        "cellAddr": "ProForma_B414",
        "npType": "double"
    },
    {
        "Variable": "Potential Affordable Units in Garden Walkups",
        "Value": "excel_if(ProForma_B405==1,ProForma_B396*ProForma_C6,0)",
        "Theme?": "Yes",
        "NmbrFmt": "0.0",
        "Type": "float",
        "InternalName": "Potential Affordable Units in Garden Walkups",
        "cellAddr": "ProForma_B415",
        "npType": "double"
    }
];


function proforma(input) {

  function excel_if(a, b, c) {
    return a ? b : c;
  }

  function min(l) {
    return Math.min.apply(null, l);
  }

  function max(l) {
    return Math.max.apply(null, l);
  }

  [
    "Land Value",
    "Improvement Value",
    "Land Use",
    "Parcel Size",
    "Residential Vacancy Rate",
    "Residential Market Rent",
    "Rent Restricted Units",
    "Depth of Affordability",
    "HUD Median Family Income",
    "Rent Restricted Units",
    "Depth of Affordability",
    "Surface parking",
    "Integrated deck",
    "Podium parking",
    "Underground parking",
    "Podium Residential",
    "Lobby construction cost",
    "Wood frame 3-story walkup",
    "Wood frame 3-story wrap w-green roof",
    "Low-rise wood frame on podium",
    "High-rise residential",
    "Landscaping",
    "Plaza-Active Courtyard",
    "Multifamily Operating Cost",
    "Hard Cost Contingency",
    "Soft Costs",
    "Developer Fee",
    "CAP Rate",
    "Return on Cost Spread over CAP",
    "Threshold for Feasibility"
  ].forEach(function (fname) {
    if(input[fname] == undefined) {
      console.log("Warning: " + fname + " missing value.");
    }
  })

  ProForma_C3 = input["Land Value"];
  ProForma_C4 = input["Improvement Value"];
  ProForma_C5 = input["Land Use"];
  ProForma_C6 = input["Parcel Size"];
  ProForma_C7 = input["Residential Vacancy Rate"];
  ProForma_C8 = input["Residential Market Rent"];
  ProForma_C9 = input["Rent Restricted Units"];
  ProForma_C10 = input["Depth of Affordability"];
  ProForma_C15 = input["HUD Median Family Income"];
  ProForma_C16 = input["Rent Restricted Units"];
  ProForma_C17 = input["Depth of Affordability"];
  ProForma_C18 = input["Surface parking"];
  ProForma_C19 = input["Integrated deck"];
  ProForma_C20 = input["Podium parking"];
  ProForma_C21 = input["Underground parking"];
  ProForma_C22 = input["Podium Residential"];
  ProForma_C23 = input["Lobby construction cost"];
  ProForma_C24 = input["Wood frame 3-story walkup"];
  ProForma_C25 = input["Wood frame 3-story wrap w-green roof"];
  ProForma_C26 = input["Low-rise wood frame on podium"];
  ProForma_C27 = input["High-rise residential"];
  ProForma_C28 = input["Landscaping"];
  ProForma_C29 = input["Plaza-Active Courtyard"];
  ProForma_C30 = input["Multifamily Operating Cost"];
  ProForma_C31 = input["Hard Cost Contingency"];
  ProForma_C32 = input["Soft Costs"];
  ProForma_C33 = input["Developer Fee"];
  ProForma_C34 = input["CAP Rate"];
  ProForma_C35 = input["Return on Cost Spread over CAP"];
  ProForma_C36 = input["Threshold for Feasibility"];

  ProForma_B41 = 43560
  ProForma_B43 = 200
  ProForma_B42 = ProForma_B41/ProForma_B43
  ProForma_B44 = ProForma_C4+ProForma_C3
  ProForma_B47 = 1
  ProForma_B50 = ProForma_C15
  ProForma_B51 = 0.3
  ProForma_B52 = 0.7
  ProForma_B53 = 0.75
  ProForma_B54 = 0.9
  ProForma_B55 = 1.04
  ProForma_B56 = 75
  ProForma_B57 = 90
  ProForma_B58 = 100
  ProForma_B59 = 115
  ProForma_B60 = ProForma_B50*ProForma_B51*ProForma_B52/12-ProForma_B56
  ProForma_B61 = ProForma_B50*ProForma_B51*ProForma_B53/12-ProForma_B57
  ProForma_B62 = ProForma_B50*ProForma_B51*ProForma_B54/12-ProForma_B58
  ProForma_B63 = ProForma_B50*ProForma_B51*ProForma_B55/12-ProForma_B59
  ProForma_B66 = 0.3
  ProForma_B67 = 0.4
  ProForma_B68 = 0.3
  ProForma_B69 = 0
  ProForma_B70 = 500
  ProForma_B71 = 725
  ProForma_B72 = 950
  ProForma_B73 = 1200
  ProForma_B81 = ProForma_B66
  ProForma_B82 = ProForma_B67
  ProForma_B83 = ProForma_B68
  ProForma_B84 = ProForma_B69
  ProForma_B74 = ((ProForma_B70)*(ProForma_B81))+((ProForma_B71)*(ProForma_B82))+((ProForma_B72)*(ProForma_B83))+((ProForma_B73)*(ProForma_B84))
  ProForma_B86 = 0
  ProForma_B87 = 0
  ProForma_B88 = 0
  ProForma_B89 = 1
  ProForma_B100 = 27
  ProForma_B110 = ProForma_B42-ProForma_B100
  ProForma_B111 = ProForma_B43-ProForma_B100*2
  ProForma_B112 = ProForma_B110*ProForma_B111
  ProForma_B113 = 3000
  ProForma_B114 = ProForma_B112-ProForma_B113
  ProForma_B115 = 4
  ProForma_B116 = ProForma_B114+ProForma_B112*(ProForma_B115-1)
  ProForma_B117 = 380
  ProForma_B118 = Math.floor(ProForma_B116/ProForma_B117)
  ProForma_B119 = Math.floor(ProForma_B118/ProForma_B47)
  ProForma_B101 = ProForma_B42*2+ProForma_B43
  ProForma_B102 = 18
  ProForma_B104 = 3
  ProForma_B105 = Math.floor(ProForma_B101/ProForma_B102)-(ProForma_B104-1)
  ProForma_B120 = ProForma_B119-ProForma_B105
  ProForma_B122 = 70
  ProForma_B123 = min([ProForma_B110,ProForma_B111])
  ProForma_B124 = ProForma_B122*ProForma_B123
  ProForma_B98 = 0.9
  ProForma_B97 = ProForma_B74/ProForma_B98
  ProForma_B125 = ProForma_B124/ProForma_B97
  ProForma_B126 = Math.floor(ProForma_B120/ProForma_B125)
  ProForma_B127 = ProForma_B126*ProForma_B124
  ProForma_B128 = Math.floor(ProForma_B127/ProForma_B97)
  ProForma_B91 = (ProForma_B81*ProForma_B128+ProForma_B86*ProForma_B105)/(ProForma_B105+ProForma_B128)
  ProForma_B92 = (ProForma_B82*ProForma_B128+ProForma_B87*ProForma_B105)/(ProForma_B105+ProForma_B128)
  ProForma_B93 = (ProForma_B83*ProForma_B128+ProForma_B88*ProForma_B105)/(ProForma_B105+ProForma_B128)
  ProForma_B94 = (ProForma_B84*ProForma_B128+ProForma_B89*ProForma_B105)/(ProForma_B105+ProForma_B128)
  ProForma_B95 = ((ProForma_B60)*(ProForma_B91))+((ProForma_B61)*(ProForma_B92))+((ProForma_B62)*(ProForma_B93))+((ProForma_B63)*(ProForma_B94))
  ProForma_B103 = ProForma_B41-ProForma_B110*ProForma_B111
  ProForma_B106 = 3
  ProForma_B107 = ProForma_B106*ProForma_B103
  ProForma_B129 = ProForma_B127*ProForma_B98
  ProForma_B131 = ProForma_B41-ProForma_B124
  ProForma_B135 = ProForma_B66
  ProForma_B136 = ProForma_B67
  ProForma_B137 = ProForma_B68
  ProForma_B138 = ProForma_B69
  ProForma_B139 = ((ProForma_B135)*(ProForma_B60))+((ProForma_B136)*(ProForma_B61))+((ProForma_B137)*(ProForma_B62))+((ProForma_B138)*(ProForma_B63))
  ProForma_B142 = 0.9
  ProForma_B141 = ProForma_B74/ProForma_B142
  ProForma_B144 = 27+6+27
  ProForma_B145 = ProForma_B42-ProForma_B144*2
  ProForma_B146 = ProForma_B43-ProForma_B144*2
  ProForma_B147 = ProForma_B145*ProForma_B146
  ProForma_B148 = ProForma_B41-ProForma_B147
  ProForma_B149 = 4
  ProForma_B150 = ProForma_B148*ProForma_B149
  ProForma_B151 = Math.floor(ProForma_B150/ProForma_B141)
  ProForma_B152 = ProForma_B150*ProForma_B142
  ProForma_B154 = 1500
  ProForma_B155 = 1500
  ProForma_B156 = ProForma_B41-ProForma_B154-ProForma_B155
  ProForma_B157 = 380
  ProForma_B158 = Math.floor(ProForma_B156/ProForma_B157)
  ProForma_B159 = ProForma_B151*ProForma_B47
  ProForma_B161 = 0.125
  ProForma_B162 = 10
  ProForma_B163 = 20
  ProForma_B164 = ProForma_B163*ProForma_B162/ProForma_B161
  ProForma_B165 = ProForma_B156-ProForma_B164
  ProForma_B166 = Math.floor(ProForma_B165/ProForma_B157)
  ProForma_B168 = 0.9
  ProForma_B169 = ProForma_B41*ProForma_B168
  ProForma_B170 = ProForma_B169-ProForma_B164
  ProForma_B171 = 400
  ProForma_B172 = Math.floor(ProForma_B170/ProForma_B171)
  ProForma_B173 = (ProForma_B159-ProForma_B166)/ProForma_B172
  ProForma_B174 = ProForma_B172*ProForma_B173
  ProForma_B175 = Math.ceil(ProForma_B173)
  ProForma_B180 = ProForma_B66
  ProForma_B181 = ProForma_B67
  ProForma_B182 = ProForma_B68
  ProForma_B183 = ProForma_B69
  ProForma_B184 = ((ProForma_B180)*(ProForma_B60))+((ProForma_B181)*(ProForma_B61))+((ProForma_B182)*(ProForma_B62))+((ProForma_B183)*(ProForma_B63))
  ProForma_B187 = 0.9
  ProForma_B186 = ProForma_B74/ProForma_B187
  ProForma_B189 = 50
  ProForma_B190 = 10
  ProForma_B191 = ProForma_B42-ProForma_B189-ProForma_B190
  ProForma_B192 = ProForma_B43-ProForma_B189-ProForma_B190
  ProForma_B193 = ProForma_B191*ProForma_B192
  ProForma_B194 = (ProForma_B42-2*ProForma_B190)*ProForma_B189+(ProForma_B43-2*ProForma_B190)*ProForma_B189-ProForma_B189*ProForma_B189
  ProForma_B195 = 3
  ProForma_B196 = ProForma_B194*ProForma_B195
  ProForma_B197 = Math.floor(ProForma_B196/ProForma_B186)
  ProForma_B198 = ProForma_B196*ProForma_B187
  ProForma_B200 = Math.ceil(ProForma_B197*ProForma_B47)
  ProForma_B201 = 350
  ProForma_B202 = ProForma_B200*ProForma_B201
  ProForma_B204 = (ProForma_B190*ProForma_B189*2)+(ProForma_B190*ProForma_B42+ProForma_B190*ProForma_B43-ProForma_B190*ProForma_B190)+(ProForma_B193-ProForma_B202)
  ProForma_B210 = ProForma_C18
  ProForma_B211 = 17000
  ProForma_B212 = ProForma_C19
  ProForma_B213 = ProForma_C20
  ProForma_B214 = 28000
  ProForma_B215 = 0
  ProForma_B216 = ProForma_C21
  ProForma_B217 = 120
  ProForma_B220 = ProForma_C22
  ProForma_B221 = ProForma_C23
  ProForma_B223 = ProForma_C24
  ProForma_B225 = ProForma_C26
  ProForma_B227 = ProForma_C27
  ProForma_B234 = ProForma_C28
  ProForma_B235 = ProForma_C29
  ProForma_B238 = ProForma_C31
  ProForma_B239 = ProForma_C32
  ProForma_B240 = ((1+ProForma_B238)*(1+ProForma_B239))-1
  ProForma_B241 = ProForma_C33
  ProForma_B244 = ProForma_C34
  ProForma_B245 = ProForma_C35
  ProForma_B252 = ProForma_B128+ProForma_B105
  ProForma_B253 = ProForma_C16
  ProForma_B254 = Math.ceil(ProForma_B253*ProForma_B252)
  ProForma_B255 = ProForma_C17
  ProForma_B256 = ProForma_B255*ProForma_B95
  ProForma_B257 = ProForma_B256*ProForma_B254*12
  ProForma_B258 = ProForma_B252-ProForma_B254
  ProForma_B259 = ProForma_C8
  ProForma_B260 = (ProForma_B129+ProForma_B107)*ProForma_B258/ProForma_B252
  ProForma_B261 = ProForma_B260*ProForma_B259*12
  ProForma_B262 = ProForma_B261+ProForma_B257
  ProForma_B263 = ProForma_B262*ProForma_C30
  ProForma_B264 = ProForma_B262*ProForma_C7
  ProForma_B265 = 0
  ProForma_B266 = ProForma_B265*ProForma_B254
  ProForma_B267 = ProForma_B262-ProForma_B263-ProForma_B264+ProForma_B266
  ProForma_B269 = (ProForma_B118*ProForma_B212)
  ProForma_B270 = ProForma_B220*ProForma_B107
  ProForma_B271 = ProForma_B113*ProForma_B221
  ProForma_B272 = ProForma_B127*ProForma_B227
  ProForma_B273 = ProForma_B235*ProForma_B131
  ProForma_B274 = (ProForma_B269+ProForma_B270+ProForma_B271+ProForma_B272+ProForma_B273)*ProForma_B240
  ProForma_B275 = (ProForma_B269+ProForma_B270+ProForma_B271+ProForma_B272+ProForma_B273+ProForma_B274)*ProForma_B241
  ProForma_B276 = 0
  ProForma_B277 = ProForma_B276*ProForma_B254
  ProForma_B278 = (ProForma_B269+ProForma_B270+ProForma_B271+ProForma_B272+ProForma_B273+ProForma_B274+ProForma_B275+ProForma_B277)
  ProForma_B280 = ProForma_B267/ProForma_B278
  ProForma_B281 = (ProForma_B244+ProForma_B245)
  ProForma_B282 = ProForma_B280-ProForma_B281
  ProForma_B283 = ProForma_B282*ProForma_B278/ProForma_B281
  ProForma_B284 = ProForma_B283/ProForma_B41
  ProForma_B286 = ProForma_B267/ProForma_B244
  ProForma_B287 = 0.0029699395315908542
  ProForma_B292 = ProForma_B151
  ProForma_B293 = ProForma_C16
  ProForma_B294 = Math.ceil(ProForma_B293*ProForma_B292)
  ProForma_B295 = ProForma_C17
  ProForma_B296 = ProForma_B295*ProForma_B139
  ProForma_B297 = ProForma_B296*ProForma_B294*12
  ProForma_B298 = ProForma_B292-ProForma_B294
  ProForma_B299 = ProForma_C8
  ProForma_B300 = ProForma_B152*ProForma_B298/ProForma_B292
  ProForma_B301 = ProForma_B300*ProForma_B299*12
  ProForma_B302 = ProForma_B301+ProForma_B297
  ProForma_B303 = ProForma_B302*ProForma_C30
  ProForma_B304 = ProForma_B302*ProForma_C7
  ProForma_B305 = 0
  ProForma_B306 = ProForma_B305*ProForma_B294
  ProForma_B307 = ProForma_B302-ProForma_B303-ProForma_B304+ProForma_B306
  ProForma_B309 = ProForma_B154*ProForma_B221
  ProForma_B310 = ProForma_B155*ProForma_B221
  ProForma_B311 = ProForma_B166*ProForma_B213
  ProForma_B312 = ProForma_B174*ProForma_B216
  ProForma_B313 = ProForma_B217*ProForma_B175*ProForma_B164
  ProForma_B314 = ProForma_B150*ProForma_B225
  ProForma_B315 = ProForma_B235*ProForma_B147
  ProForma_B316 = (ProForma_B311+ProForma_B312+ProForma_B313+ProForma_B314+ProForma_B315)*ProForma_B240
  ProForma_B317 = (ProForma_B311+ProForma_B312+ProForma_B313+ProForma_B314+ProForma_B315+ProForma_B316)*ProForma_B241
  ProForma_B318 = 0
  ProForma_B319 = ProForma_B318*ProForma_B294
  ProForma_B320 = (ProForma_B309+ProForma_B310+ProForma_B311+ProForma_B312+ProForma_B313+ProForma_B314+ProForma_B315+ProForma_B316+ProForma_B317+ProForma_B319)
  ProForma_B322 = ProForma_B307/ProForma_B320
  ProForma_B323 = (ProForma_B244+ProForma_B245)
  ProForma_B324 = ProForma_B322-ProForma_B323
  ProForma_B325 = ProForma_B324*ProForma_B320/ProForma_B323
  ProForma_B326 = ProForma_B325/ProForma_B41
  ProForma_B328 = ProForma_B307/ProForma_B244
  ProForma_B329 = 0.0015
  ProForma_B334 = ProForma_B197
  ProForma_B335 = ProForma_C16
  ProForma_B336 = Math.ceil(ProForma_B335*ProForma_B334)
  ProForma_B337 = ProForma_C17
  ProForma_B338 = ProForma_B337*ProForma_B184
  ProForma_B339 = ProForma_B338*ProForma_B336*12
  ProForma_B340 = ProForma_B334-ProForma_B336
  ProForma_B341 = ProForma_C8
  ProForma_B342 = ProForma_B198*ProForma_B340/ProForma_B334
  ProForma_B343 = ProForma_B342*ProForma_B341*12
  ProForma_B344 = ProForma_B343+ProForma_B339
  ProForma_B345 = ProForma_B344*ProForma_C30
  ProForma_B346 = ProForma_B344*ProForma_C7
  ProForma_B347 = 0
  ProForma_B348 = ProForma_B336*ProForma_B347
  ProForma_B349 = ProForma_B344-ProForma_B345-ProForma_B346+ProForma_B348
  ProForma_B351 = ProForma_B196*ProForma_B223
  ProForma_B352 = ProForma_B210*ProForma_B200
  ProForma_B353 = ProForma_B204*ProForma_B234
  ProForma_B354 = (ProForma_B351+ProForma_B352+ProForma_B353)*ProForma_B240
  ProForma_B355 = (ProForma_B351+ProForma_B352+ProForma_B353+ProForma_B354)*ProForma_B241
  ProForma_B356 = 0
  ProForma_B357 = ProForma_B356*ProForma_B336
  ProForma_B358 = (ProForma_B351+ProForma_B352+ProForma_B353+ProForma_B354+ProForma_B355+ProForma_B357)
  ProForma_B360 = ProForma_B349/ProForma_B358
  ProForma_B361 = (ProForma_B244+ProForma_B245)
  ProForma_B362 = ProForma_B360-ProForma_B361
  ProForma_B363 = ProForma_B362*ProForma_B358/ProForma_B361
  ProForma_B364 = ProForma_B363/ProForma_B41
  ProForma_B366 = ProForma_B349/ProForma_B244
  ProForma_B367 = 0.0015
  ProForma_B371 = ProForma_B44/ProForma_C6
  ProForma_B374 = ProForma_B284
  ProForma_B375 = ProForma_B326
  ProForma_B376 = ProForma_B364
  ProForma_B379 = ProForma_B374+Math.abs(ProForma_B374*ProForma_C36)
  ProForma_D379 = "Tower"
  ProForma_B380 = ProForma_B375+Math.abs(ProForma_B375*ProForma_C36)
  ProForma_D380 = "4 over 1 Podium"
  ProForma_B381 = ProForma_B376+Math.abs(ProForma_B376*ProForma_C36)
  ProForma_D381 = "Garden Walkups"
  ProForma_B384 = excel_if(ProForma_B379==max([ProForma_B379,ProForma_B380,ProForma_B381]),1,0)
  ProForma_B385 = excel_if(ProForma_B380==max([ProForma_B379,ProForma_B380,ProForma_B381]),1,0)
  ProForma_B386 = excel_if(ProForma_B381==max([ProForma_B379,ProForma_B380,ProForma_B381]),1,0)
  ProForma_B389 = ProForma_B258/ProForma_B41
  ProForma_B390 = ProForma_B298/ProForma_B41
  ProForma_B391 = ProForma_B340/ProForma_B41
  ProForma_B394 = ProForma_B254/ProForma_B41
  ProForma_B395 = ProForma_B294/ProForma_B41
  ProForma_B396 = ProForma_B336/ProForma_B41
  ProForma_B400 = ProForma_B374
  ProForma_B401 = ProForma_B375
  ProForma_B402 = ProForma_B376
  ProForma_B403 = excel_if(ProForma_B374<0,-1,excel_if(ProForma_B379<ProForma_B371,0,1))
  ProForma_B404 = excel_if(ProForma_B375<0,-1,excel_if(ProForma_B380<ProForma_B371,0,1))
  ProForma_B405 = excel_if(ProForma_B376<0,-1,excel_if(ProForma_B381<ProForma_B371,0,1))
  ProForma_B406 = excel_if((ProForma_B403<1 && ProForma_B404<1 && ProForma_B405<1),"N/A",excel_if(ProForma_B384==1,ProForma_D379,excel_if(ProForma_B385==1,ProForma_D380,excel_if(ProForma_B386==1,ProForma_D381,"Error"))))
  ProForma_B407 = excel_if(ProForma_B403==1,(ProForma_B389+ProForma_B394)*ProForma_C6,0)
  ProForma_B408 = excel_if(ProForma_B404==1,(ProForma_B390+ProForma_B395)*ProForma_C6,0)
  ProForma_B409 = excel_if(ProForma_B405==1,(ProForma_B391+ProForma_B396)*ProForma_C6,0)
  ProForma_B410 = excel_if(ProForma_B403==1,ProForma_B389*ProForma_C6,0)
  ProForma_B411 = excel_if(ProForma_B404==1,ProForma_B390*ProForma_C6,0)
  ProForma_B412 = excel_if(ProForma_B405==1,ProForma_B391*ProForma_C6,0)
  ProForma_B413 = excel_if(ProForma_B403==1,ProForma_B394*ProForma_C6,0)
  ProForma_B414 = excel_if(ProForma_B404==1,ProForma_B395*ProForma_C6,0)
  ProForma_B415 = excel_if(ProForma_B405==1,ProForma_B396*ProForma_C6,0)

  return {
    "Residual Land Value of Tower": ProForma_B400,
    "Residual Land Value of 4 over 1 Podium": ProForma_B401,
    "Residual Land Value of Garden Walkups": ProForma_B402,
    "Feasibility of Tower": ProForma_B403,
    "Feasibility of 4 over 1 Podium": ProForma_B404,
    "Feasibility of Garden Walkups": ProForma_B405,
    "Most Feasible Option": ProForma_B406,
    "Potential Units in Tower": ProForma_B407,
    "Potential Units in 4 over 1 Podium": ProForma_B408,
    "Potential Units in Garden Walkups": ProForma_B409,
    "Potential Market-Rate Units in Tower": ProForma_B410,
    "Potential Market-Rate Units in 4 over 1 Podium": ProForma_B411,
    "Potential Market-Rate Units in Garden Walkups": ProForma_B412,
    "Potential Affordable Units in Tower": ProForma_B413,
    "Potential Affordable Units in 4 over 1 Podium": ProForma_B414,
    "Potential Affordable Units in Garden Walkups": ProForma_B415
  }
}
