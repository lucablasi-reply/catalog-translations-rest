export const translationReportEmailTemplate = `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <meta name="viewport" content="initial-scale=1.0" />
    <!-- So that mobile webkit will display zoomed in -->
    <meta name="format-detection" content="telephone=no" />
    <!-- disable auto telephone linking in iOS -->
    <title>Translation Report</title>
  </head>
  <body
    marginwidth="0"
    marginheight="0"
    style="margin: 0px; padding: 0px 0px"
    leftmargin="0"
    topmargin="0"
  >
    <h2>Translations Results</h2>
    <p>You can check the result of your translations in the following link</p>
    <p>{{translationResponse}}</p>
  </body>
</html>
`
