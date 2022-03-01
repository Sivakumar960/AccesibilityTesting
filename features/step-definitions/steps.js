const AxeBuilder=require('@axe-core/webdriverio').default
const fs=require('fs')
import {Given,When,Then} from '@wdio/cucumber-framework'
import {createHtmlReport} from 'axe-html-reporter'

Given(/^user is on the url$/, async ()=> {
    await browser.url('https://webdriver.io/docs/gettingstarted')

});

When(/^user want to validate the Accesibility of the url page$/, async ()=> {
    const builder=new AxeBuilder({client:browser})
    const result=await builder.withTags(['wcag2a','wcag2aa','wcag2aaa']).analyze()
        //console.log('got',result)
        //console.log('passed',result.passes)
         //console.log('violations',result.violations)
         const reportHTML = createHtmlReport({
            results: result,
            options: {
                projectKey: 'Accesibility testing using Webdriver IO',
                doNotCreateReportFile: false,
            },
        });
        console.log('reportHTML will have full content of HTML file.');
        // suggestion on how to create file by yourself
        if (!fs.existsSync('build/reports/saveReportHere.html')) {
            fs.mkdirSync('build/reports', {
                recursive: true,
            });
        }
        fs.writeFileSync('build/reports/saveReportHere.html', reportHTML);

    
  });
  