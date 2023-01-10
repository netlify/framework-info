/**
 * The Data team has a table in snowflake that categorizes arbitrary npm
 * packages with arbitrary tags. This script extracts all the frameworks
 * tracked by framework-info and turns them into tags so we can keep the 
 * two sets in sync until we find a better way to do that.
 * 
 * All tagged packages live here (source of truth, imported into snowflake):
 * https://docs.google.com/spreadsheets/d/1CXWALCMaOjyILdfDsrkzdNkxFsmAJ-RViz8apgNyjQI/edit#gid=0
 */

const FRAMEWORKS_PATH = './src/frameworks/'

import fs from 'fs'

let files = fs.readdirSync(FRAMEWORKS_PATH)

for(let i = 0; i < files.length; i++) {

    if( ! files[i].match(/.*\.json$/)) continue

    let framework = JSON.parse(fs.readFileSync(FRAMEWORKS_PATH + files[i]))

    let packageName = framework.detect.npmDependencies[0]

    if (!packageName) continue

    console.log(`${packageName}\t${framework.category.replaceAll("_"," ")}`)

    if(framework.category == 'frontend_framework' || framework.category == 'static_site_generator') {
        console.log(`${packageName}\tweb framework`)
    }

}
