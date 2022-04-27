import React from 'react'
import LeftSideBar from '../LeftSideBar/LeftSideBar'
import Navbar from '../Navbar/Navbar'

const QuestionOverview = () => {
    return (
        <>
            <LeftSideBar />
            <div className="flex flex-wrap mx-[15%] overflow-hidden">

                <div className="grid grid-cols-4 border-b border-gray-300 mt-[3%] gap-4">
                    <div className="text-4xl text-[#3B4045] col-span-3 ">
                        How can I make a card type layout for a pinterest type masonry layout that has a card that looks like this
                    </div>
                    <div className="mt-1">
                        <button className="bg-[#0A95FF] text-white font-light py-2 px-2 rounded">
                            Ask Question
                        </button>
                    </div>
                    <div className="grid grid-cols-6">
                        <div className="font-light text-[#3B4045]">Asked</div>
                        <div className="font-normal -ml-2">today</div>
                        <div className="font-light text-[#3B4045]">Modified</div>
                        <div className="font-normal ml-2">today</div>
                        <div className="font-light ml-2 text-[#3B4045]">Viewed</div>
                        <div className="font-normal ml-2">5 times</div>
                    </div>
                </div>
                <div className="grid grid-cols-3 mt-1 mr-[15%]">
                    <div className="font-normal col-span-2 text-lg">
                        I am working on a flutter/dart rescue cat adoption app and I have a Pintrest style masonry grid layout of the cats available. I have a rough draft of a card which shows a photo of the cat and below that basic info like name and breed and characteristics and location. I would like to have a card layout that looks like the following but not sure how to round off the top and bottom of the card and have a variable height image. For the image I want it to have a set width but a variable height which will be high enough to not cut off either the sides or top or bottom of the image. The images come in a wide variety of widths and heights. The white text part should be fixed both in height and width. The card should look like this:
                        <div className="mt-3">
                            <img src="https://i.stack.imgur.com/MfWBo.png" alt="cat" />
                        </div>
                        <div className="mt-3">
                        I am pretty new to Flutter so would really like it if someone could please tell me how something like this card layout can be done. Thanks
                        </div>
                        <div className="flex mt-5 flex-wrap gap-2 overflow-auto">
                            <button className="bg-[#E1ECF4] text-[#39739F] text-sm font-light py-2 px-2 rounded">
                                flutter
                            </button>
                            <button className="bg-[#E1ECF4] text-[#39739F] text-sm font-light py-2 px-2 rounded">
                                mobile
                            </button>
                            <button className="bg-[#E1ECF4] text-[#39739F] text-sm font-light py-2 px-2 rounded">
                                flutter-layout
                            </button>
                        </div>
                        
                    </div>
                    <ul className="bg-[#FBF3D5] d-block p0 m0">
                        <div className="s-sidebarwidget--header s-sidebarwidget__small-bold-text fc-light d:fc-black-900 bb bbw1">
                            The Overflow Blog
                        </div>
                        <li className="s-sidebarwidget--item d-flex px16">
                            <div className="flex--item1 fl-shrink0">
                                <svg aria-hidden="true" className="va-text-top svg-icon iconPencilSm" width="14" height="14" viewBox="0 0 14 14"><path d="m11.1 1.71 1.13 1.12c.2.2.2.51 0 .71L11.1 4.7 9.21 2.86l1.17-1.15c.2-.2.51-.2.71 0ZM2 10.12l6.37-6.43 1.88 1.88L3.88 12H2v-1.88Z"></path></svg>            </div>
                            <div className="flex--item wmn0 ow-break-word">
                                <a href="https://stackoverflow.blog/2022/04/22/episode-435-how-a-college-extra-credit-project-became-php3-still-the-bedrock-of-the-web/?cb=1" class="js-gps-track" title="Episode 435: How a college extra-credit project became PHP3, still the bedrock of the web" data-ga="[&quot;community bulletin board&quot;,&quot;The Overflow Blog&quot;,&quot;https://stackoverflow.blog/2022/04/22/episode-435-how-a-college-extra-credit-project-became-php3-still-the-bedrock-of-the-web/&quot;,null,null]" data-gps-track="communitybulletin.click({ priority: 1, position: 0 })">Episode 435: How a college extra-credit project became PHP3, still the...</a>
                            </div>
                        </li>
                        <li className="s-sidebarwidget--item d-flex px16">
                            <div className="flex--item1 fl-shrink0">
                                <svg aria-hidden="true" class="va-text-top svg-icon iconPencilSm" width="14" height="14" viewBox="0 0 14 14"><path d="m11.1 1.71 1.13 1.12c.2.2.2.51 0 .71L11.1 4.7 9.21 2.86l1.17-1.15c.2-.2.51-.2.71 0ZM2 10.12l6.37-6.43 1.88 1.88L3.88 12H2v-1.88Z"></path></svg>            </div>
                            <div className="flex--item wmn0 ow-break-word">
                                <a href="https://stackoverflow.blog/2022/04/25/empathy-for-the-dev-avoiding-common-pitfalls-when-communicating-with-developers/?cb=1" class="js-gps-track" data-ga="[&quot;community bulletin board&quot;,&quot;The Overflow Blog&quot;,&quot;https://stackoverflow.blog/2022/04/25/empathy-for-the-dev-avoiding-common-pitfalls-when-communicating-with-developers/&quot;,null,null]" data-gps-track="communitybulletin.click({ priority: 1, position: 1 })">Empathy for the Dev:&nbsp;Avoiding common pitfalls when communicating with developers</a>
                            </div>
                        </li>
                        <div className="s-sidebarwidget--header s-sidebarwidget__small-bold-text fc-light d:fc-black-900 bb bbw1">
                            Featured on Meta
                        </div>
                        <li className="s-sidebarwidget--item d-flex px16">
                            <div className="flex--item1 fl-shrink0">
                                <div className="favicon favicon-stackexchangemeta" title="Meta Stack Exchange"></div>            </div>
                            <div className="flex--item wmn0 ow-break-word">
                                <a href="https://meta.stackexchange.com/questions/377768/how-might-the-staging-ground-the-new-ask-wizard-work-on-the-stack-exchange-net?cb=1" class="js-gps-track" title="How might the Staging Ground &amp; the new Ask Wizard work on the Stack Exchange network?" data-ga="[&quot;community bulletin board&quot;,&quot;Featured on Meta&quot;,&quot;https://meta.stackexchange.com/questions/377768/how-might-the-staging-ground-the-new-ask-wizard-work-on-the-stack-exchange-net&quot;,null,null]" data-gps-track="communitybulletin.click({ priority: 3, position: 2 })">How might the Staging Ground &amp; the new Ask Wizard work on the Stack Exchange...</a>
                            </div>
                        </li>
                        <li className="s-sidebarwidget--item d-flex px16">
                            <div className="flex--item1 fl-shrink0">
                                <div class="favicon favicon-stackoverflowmeta" title="Meta Stack Overflow"></div>            </div>
                            <div className="flex--item wmn0 ow-break-word">
                                <a href="https://meta.stackoverflow.com/questions/417475/question-close-reasons-project-introduction-and-feedback?cb=1" class="js-gps-track" data-ga="[&quot;community bulletin board&quot;,&quot;Featured on Meta&quot;,&quot;https://meta.stackoverflow.com/questions/417475/question-close-reasons-project-introduction-and-feedback&quot;,null,null]" data-gps-track="communitybulletin.click({ priority: 6, position: 3 })">Question Close Reasons project - Introduction and Feedback</a>
                            </div>
                        </li>
                        <li className="s-sidebarwidget--item d-flex px16">
                            <div className="flex--item1 fl-shrink0">
                                <div className="favicon favicon-stackoverflowmeta" title="Meta Stack Overflow"></div>            </div>
                            <div className="flex--item wmn0 ow-break-word">
                                <a href="https://meta.stackoverflow.com/questions/416486/an-a-b-test-has-gone-live-for-a-trending-sort-option-for-answers?cb=1" class="js-gps-track" data-ga="[&quot;community bulletin board&quot;,&quot;Featured on Meta&quot;,&quot;https://meta.stackoverflow.com/questions/416486/an-a-b-test-has-gone-live-for-a-trending-sort-option-for-answers&quot;,null,null]" data-gps-track="communitybulletin.click({ priority: 6, position: 4 })">An A/B test has gone live for a "Trending" sort option for answers</a>
                            </div>
                        </li>
                        <li classNmae="s-sidebarwidget--item d-flex px16">
                            <div className="flex--item1 fl-shrink0">
                                <div className="favicon favicon-stackoverflowmeta" title="Meta Stack Overflow"></div>            </div>
                            <div className="flex--item wmn0 ow-break-word">
                                <a href="https://meta.stackoverflow.com/questions/417008/overhauling-our-communitys-closure-reasons-and-guidance?cb=1" class="js-gps-track" data-ga="[&quot;community bulletin board&quot;,&quot;Featured on Meta&quot;,&quot;https://meta.stackoverflow.com/questions/417008/overhauling-our-communitys-closure-reasons-and-guidance&quot;,null,null]" data-gps-track="communitybulletin.click({ priority: 6, position: 5 })">Overhauling our community's closure reasons and guidance</a>
                            </div>
                        </li>
                    </ul>
                </div>

            </div>

        </>
    )
}

export default QuestionOverview