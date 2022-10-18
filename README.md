# graph_api_google_sheets

1. Create a google sheet
2. Change permission to Anyone on the internet with the link can view
3. Get key of the document
    `eg: https://docs.google.com/spreadsheets/d/18XF7jOBaUOMoN5KuTi5NNzq-HgAV-7Rmt1-V3H674HA/edit#gid=0
    "18XF7jOBaUOMoN5KuTi5NNzq-HgAV-7Rmt1-V3H674HA" is the document id for the above url`
4. Add the key to script.js
5. Add sheet name to script.js. If not provided, first sheet is considered
    `
    var gsKey = '18XF7jOBaUOMoN5KuTi5NNzq-HgAV-7Rmt1-V3H674HA';
    var sheet_name = null
    var gql = "SELECT *";
    `
6. Add required gquery. learn more about [query language](https://developers.google.com/chart/interactive/docs/querylanguage#overview)
7. You can't use table headers to query, you have to use Column Name(eg: A,B,C like that)

