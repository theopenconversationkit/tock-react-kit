### Changelog

All notable changes to this project will be documented in this file. Dates are displayed in UTC.

#### [20.3.4](https://github.com/theopenconversationkit/tock-react-kit/compare/v20.3.2...20.3.4)

> 2 September 2020

- **Breaking change:** resolve #34 : Theme migration documentation [`#34`](https://github.com/theopenconversationkit/tock-react-kit/issues/34)

Theme model changed :

Old theme

    const theme = {
        fontFamily: '"Source Sans Pro", "Lucida Grande", sans-serif;',
        fontSize: '1rem',
        botColor: 'red',
        cardColor: 'white',
        borderRadius: '10px',
        inputColor: 'white',
        userColor: 'white',
        styles: {
            chat: `
                background: 'blue';`
        },
    };
    
New theme

    const theme = createTheme({
        palette: {
            text: {
                user: 'black',
                bot: 'black',
                card: 'white',
                input: 'black'
            },
            background: {
                user: 'white',
                bot: 'red',
                card: 'white',
                input: 'white',
            }
        },
        sizing: {
            loaderSize: '8px',
            borderRadius: '10px',
            conversation: {
                width: '720px'
            }
        },
        typography: {
            fontFamily: '"Source Sans Pro", "Lucida Grande", sans-serif;',
            fontSize: '1rem'
        },
        overrides: {
            chat: `
                background: 'blue';`
            },
        };
    

- resolve #59 : quickreply enhancement [`#60`](https://github.com/theopenconversationkit/tock-react-kit/pull/60)
- resolve #55 : Input icon size on firefox android [`#58`](https://github.com/theopenconversationkit/tock-react-kit/pull/58)
- resolve #56 : Remove conversation scrollbar on firefox [`#57`](https://github.com/theopenconversationkit/tock-react-kit/pull/57)
- 34 Missing default theme [`#53`](https://github.com/theopenconversationkit/tock-react-kit/pull/53)
- resolve #59 : [`#59`](https://github.com/theopenconversationkit/tock-react-kit/issues/59)
- resolve #56 : Remove conversation scrollbar on firefox [`#56`](https://github.com/theopenconversationkit/tock-react-kit/issues/56)
- resolve #55 : Input icon size on firefox android [`#55`](https://github.com/theopenconversationkit/tock-react-kit/issues/55)
- resolve #52 : Add husky git hook [`#52`](https://github.com/theopenconversationkit/tock-react-kit/issues/52)
- resolve #52 : Adding ESLint and Prettier config [`#52`](https://github.com/theopenconversationkit/tock-react-kit/issues/52)
- Add default theme [`e9e3adb`](https://github.com/theopenconversationkit/tock-react-kit/commit/e9e3adbfeaba0ba964fd1fc1d20152e4c490fd4e)
- Normalize interface properties EOL [`44863eb`](https://github.com/theopenconversationkit/tock-react-kit/commit/44863ebeba9d259b8ca2ce03dbaf0ad1d6674d93)
- Add disabled input background to theme [`bbbb32b`](https://github.com/theopenconversationkit/tock-react-kit/commit/bbbb32b2f44f8929417aa1abe7f66e17390f2457)
- Fix Chat story FullscreenContainer scrollbar [`2fe291e`](https://github.com/theopenconversationkit/tock-react-kit/commit/2fe291ee0264a1cd7a4f226ced252c450790d665)
- Revert TockProvider to TockContext [`51e29ed`](https://github.com/theopenconversationkit/tock-react-kit/commit/51e29ede6b0deddde17e7203065f1be004738d80)
- Expose createTheme [`bb87869`](https://github.com/theopenconversationkit/tock-react-kit/commit/bb87869eddc3db660bb2c46d257633481e211df8)

#### [v20.3.2](https://github.com/theopenconversationkit/tock-react-kit/compare/v20.3.1...v20.3.2)

> 20 August 2020

- resolve #50 : Carousel scrollbar appears in firefox [`#51`](https://github.com/theopenconversationkit/tock-react-kit/pull/51)
- resolves #33 Fix carousel bad scroll behaviour [`#47`](https://github.com/theopenconversationkit/tock-react-kit/pull/47)
- resolve #50 : Carousel scrollbar appears in firefox [`#50`](https://github.com/theopenconversationkit/tock-react-kit/issues/50)
- Fix carousel scroll behavior [`fda4193`](https://github.com/theopenconversationkit/tock-react-kit/commit/fda419394a53fa6ffc53259444d2cffc78b82cdd)
- Fix Carousel scroll x & arrows visibility [`0620111`](https://github.com/theopenconversationkit/tock-react-kit/commit/062011198f0f6ea59c1c502baea18f444ebf0963)

#### [v20.3.1](https://github.com/theopenconversationkit/tock-react-kit/compare/v20.3.1-1...v20.3.1)

> 17 August 2020

- resolves #48 Created utility method for retrieving and saving data to local storage [`#49`](https://github.com/theopenconversationkit/tock-react-kit/pull/49)
- resolves #25 Send post messages only after opening the sse connection [`#45`](https://github.com/theopenconversationkit/tock-react-kit/pull/45)
- resolve #35 : Card component is not exported [`#36`](https://github.com/theopenconversationkit/tock-react-kit/pull/36)
- fix urlButton in message as quickReply [`#37`](https://github.com/theopenconversationkit/tock-react-kit/pull/37)
- resolves #43 Transform any string url in the bot message text into a clickable one [`#44`](https://github.com/theopenconversationkit/tock-react-kit/pull/44)
- resolve #38 : Add rollup watch command for dev purpose [`#39`](https://github.com/theopenconversationkit/tock-react-kit/pull/39)
- resolve #40 : Contribution guide [`#41`](https://github.com/theopenconversationkit/tock-react-kit/pull/41)
- resolves #48 Created utility method for retrieving and saving data to localstorage and used it for persisting the userId [`#48`](https://github.com/theopenconversationkit/tock-react-kit/issues/48)
- resolves #25 Send post messages only after opening the sse connection (#45) [`#25`](https://github.com/theopenconversationkit/tock-react-kit/issues/25) [`#25`](https://github.com/theopenconversationkit/tock-react-kit/issues/25) [`#25`](https://github.com/theopenconversationkit/tock-react-kit/issues/25) [`#25`](https://github.com/theopenconversationkit/tock-react-kit/issues/25) [`#25`](https://github.com/theopenconversationkit/tock-react-kit/issues/25)
- fix urlButton in message as quickReply (#37) [`#42`](https://github.com/theopenconversationkit/tock-react-kit/issues/42) [`#42`](https://github.com/theopenconversationkit/tock-react-kit/issues/42) [`#42`](https://github.com/theopenconversationkit/tock-react-kit/issues/42) [`#42`](https://github.com/theopenconversationkit/tock-react-kit/issues/42)
- resolve #35 : Card component is not exported [`#35`](https://github.com/theopenconversationkit/tock-react-kit/issues/35)
- resolves #43 [MessageBot] Transform any string url in the bot message text into a clickable url using linkifyjs [`#43`](https://github.com/theopenconversationkit/tock-react-kit/issues/43)
- resolve #38 : Add rollup watch and build command for development purpose [`#38`](https://github.com/theopenconversationkit/tock-react-kit/issues/38) [`#38`](https://github.com/theopenconversationkit/tock-react-kit/issues/38)
- resolve #40 : Contribution guide [`#40`](https://github.com/theopenconversationkit/tock-react-kit/issues/40)
- Update dependencies [`20c5dbb`](https://github.com/theopenconversationkit/tock-react-kit/commit/20c5dbbc0833f5ce371d97bae30dc1a985106868)

#### v20.3.1-1

> 23 April 2020

- resolve #30 : support for postbackbutton (send payload instead of message) [`#31`](https://github.com/theopenconversationkit/tock-react-kit/pull/31)
- publish github action [`#29`](https://github.com/theopenconversationkit/tock-react-kit/pull/29)
- better release system [`#27`](https://github.com/theopenconversationkit/tock-react-kit/pull/27)
- fix scroll on ie and iphone, backport fix Baki [`#26`](https://github.com/theopenconversationkit/tock-react-kit/pull/26)
- fix #20 : Server-Sent Events (SSE) Support [`#21`](https://github.com/theopenconversationkit/tock-react-kit/pull/21)
- Add custom component into Chat [`#19`](https://github.com/theopenconversationkit/tock-react-kit/pull/19)
- fix #14 : Configure timeout before displaying message [`#16`](https://github.com/theopenconversationkit/tock-react-kit/pull/16)
- cherry pick some marvin features [`#13`](https://github.com/theopenconversationkit/tock-react-kit/pull/13)
- fix carousel card buttons [`#8`](https://github.com/theopenconversationkit/tock-react-kit/pull/8)
- Bump acorn from 6.3.0 to 6.4.1 [`#7`](https://github.com/theopenconversationkit/tock-react-kit/pull/7)
- fixes sendQuickReply userId parameter + referral Parameter [`#4`](https://github.com/theopenconversationkit/tock-react-kit/pull/4)
- feat(Card): Update Card styled component for manage more styles [`#6`](https://github.com/theopenconversationkit/tock-react-kit/pull/6)
- resolve #30 : support for postbackbutton (send payload instead of message) [`#30`](https://github.com/theopenconversationkit/tock-react-kit/issues/30)
- fix #23 : hide quickreplies after click [`#23`](https://github.com/theopenconversationkit/tock-react-kit/issues/23)
- fix #22 : Buttons bar is under input bar [`#22`](https://github.com/theopenconversationkit/tock-react-kit/issues/22)
- fix #20 : Server-Sent Events (SSE) Support [`#20`](https://github.com/theopenconversationkit/tock-react-kit/issues/20)
- fix #18 : Add custom component into Chat [`#18`](https://github.com/theopenconversationkit/tock-react-kit/issues/18)
- fix #17 : Add loading animation when referral parameter is sent [`#17`](https://github.com/theopenconversationkit/tock-react-kit/issues/17)
- fix #14 : Configure timeout before displaying message [`#14`](https://github.com/theopenconversationkit/tock-react-kit/issues/14)
- resolves #1 user id should be different at each browser refresh [`#1`](https://github.com/theopenconversationkit/tock-react-kit/issues/1)
- resolves #3 support carousel with cards &lt; 3 and cards with subtitle html [`#3`](https://github.com/theopenconversationkit/tock-react-kit/issues/3)
- Add MessageBot and MessageUser [`5ccac35`](https://github.com/theopenconversationkit/tock-react-kit/commit/5ccac354b9b04bcf7469a191682bf04c75bab4f2)
- Add customization to ChatInput [`d2b3fa8`](https://github.com/theopenconversationkit/tock-react-kit/commit/d2b3fa8b8395252f4983f87ad395037c83753639)
- Add useTock support for cards, carousels and quick replies [`aa579a2`](https://github.com/theopenconversationkit/tock-react-kit/commit/aa579a27705f70409e70f05b0674808ef3f661f6)
- bump repo version [`e39f615`](https://github.com/theopenconversationkit/tock-react-kit/commit/e39f6150019153ed627cd4f185781e3904ab93be)
- margin message bot [`a9fa0e7`](https://github.com/theopenconversationkit/tock-react-kit/commit/a9fa0e77bacf358889fbec8f265b8725ddc50fdb)
- Add referalparameter & widget arguments to renderChat function [`5cdb2b1`](https://github.com/theopenconversationkit/tock-react-kit/commit/5cdb2b1ef77e145f24af2a85e26a5d79917e0560)
- Fix CTA/QR callbacks, changed Carousel justify-content to space-between (fixing scroll) [`28daaf8`](https://github.com/theopenconversationkit/tock-react-kit/commit/28daaf834652a33171d90a81a057bda8d8b53a40)
- Add Referral parameter [`f40c339`](https://github.com/theopenconversationkit/tock-react-kit/commit/f40c339137f07391f059bf65c885e1ad100c2077)
- handle pre release mode [`c016e25`](https://github.com/theopenconversationkit/tock-react-kit/commit/c016e252e779e27fdf5b69e615a568b78a9ccba7)
- fix version and prerealase [`2c2674e`](https://github.com/theopenconversationkit/tock-react-kit/commit/2c2674e5ebfb4aa35fff598e52f1bae1432bba4c)
- bump version [`db53349`](https://github.com/theopenconversationkit/tock-react-kit/commit/db53349c9a02663a08f07485edc29220e7aece3b)
- bump package version [`19f0145`](https://github.com/theopenconversationkit/tock-react-kit/commit/19f0145ba304c8afdceddb88fb77e8544015a99c)
- mode release github actions [`d0f0560`](https://github.com/theopenconversationkit/tock-react-kit/commit/d0f0560b3db8b9f6c92e890d81d57616f07cde1e)
- bump version, fix scroll [`073c0ed`](https://github.com/theopenconversationkit/tock-react-kit/commit/073c0ed6c5322b0c99fb8f6b876d0edd44209f6c)
- fixes sendQuickReply userId parameter [`36b31fb`](https://github.com/theopenconversationkit/tock-react-kit/commit/36b31fbbd462e327dafee05c4b4e7dbf741a4b52)
- bump package version, what's new : add see support [`1a327bc`](https://github.com/theopenconversationkit/tock-react-kit/commit/1a327bc3a0561ca8c78b28f2db70be3f320292ff)
- temporary remove git sign tag [`370fd6e`](https://github.com/theopenconversationkit/tock-react-kit/commit/370fd6ed4532babb89becb218852dee5934f6381)
- add publish action status [`917682c`](https://github.com/theopenconversationkit/tock-react-kit/commit/917682c1f5fe0b8343b9bab25ce4b43056eeeb42)
- fixes preserve white-space on bot message [`c8fbb74`](https://github.com/theopenconversationkit/tock-react-kit/commit/c8fbb74d345c3113a6f890c9bb011832ecc0f618)
- sign tag [`59e1454`](https://github.com/theopenconversationkit/tock-react-kit/commit/59e14548427fdbeddff569579acc87f7307db88a)
