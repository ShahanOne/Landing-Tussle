import React, { useState, useEffect } from 'react';
import styles from './index.module.scss';
import HighlightJamun from '../../components/highlights/HighlightJamun';
import HighlightTeak from '../../components/highlights/HighlightTeak';
import CardHippo from '../../components/cards/CardHippo';
import CardMantisShrimp from '../../components/cards/CardMantisShrimp';
import Skeleton from './skeleton';

import knownTimezones from '../../assets/timezones';
import importantTimezones from '../../assets/importantTimezones';
import tussleLogo from '../../assets/images/Tussle_Favicon.png';
import YellowCalendarIcon from '../../assets/icons/CalendarYellow.svg';
import calendarIcon from '../../assets/icons/Calendar.svg';
// import { ReactComponent as ShareIcon } from "../../assets/images/shareIcon.svg";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import markdownInputStyles from './markdownInput.module.scss';
// import SkeletonEvent from './Skeleton';

export async function getServerSideProps({ params }) {
  const results = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}api/challenge?type=EVENT`
  ).then((r) => r.json());
  var res;
  results.response.data.map((result) => {
    if (result.slug === params.slug) {
      res = result;
    }
  });
  return {
    props: {
      event: res,
    },
  };
}
export async function getServerSidePaths() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}api/challenge?type=EVENT`
  ).then((r) => r.json());
  console.log('tyer', res.response.data.length);
  return {
    paths: res.response.data.map((data) => {
      return {
        params: {
          slug: data.slug,
        },
      };
    }),
    fallback: false,
  };
}

const weeks = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const fullWeeks = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];
const months = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

const get = (url, params, headers) => {
  let formatedParams = '?';
  if (params) {
    const paramsArr = Object.entries(params);
    formatedParams += paramsArr.map((e) => `${e[0]}=${e[1]}`).join('&');
  }

  return fetch(url + formatedParams, { headers: { ...(headers || {}) } })
    .then((result) => result.json())
    .then((data) => data)
    .catch((err) => ({
      error: err.message,
    }));
};

async function getBrowserLocationByIp() {
  const url = 'https://api.ipstack.com/check';
  return get(url, { access_key: 'ada325085f484785cbc7c17fb889e918' }, {}).catch(
    () => false
  );
}

function Index({ event }) {
  const [priceText, setPriceText] = useState('');
  const [showMore, setShowMore] = useState(false);
  const [showDateSelect, setShowDateSelect] = useState(false);

  const [MDText, setMDText] = useState('');

  const title = event.title;
  const coverImage = event.cover_image[0].path;
  const eventDescription = event.description;
  const eventLink = event.event_link;
  const tags = event.tags.map((t) => t.title);
  const tagColors = [];
  for (let i = 0; i < event.tags.length; i += 1) {
    tagColors.push(i % 2 ? 'rgb(246,165,192)' : 'rgb(130, 200, 138)');
  }
  getBrowserLocationByIp().then((locationByIp) => {
    let country = 'IN';
    if (locationByIp) {
      country = locationByIp.country_code || 'IN';
    }
    setPriceText(
      country === 'IN' ? `₹${event.inrPrice}` : `$${event.nonInrPrice}`
    );
  });
  const upcomingSchedules =
    event.eventschedules &&
    event.eventschedules
      .sort(
        (schedule1, schedule2) =>
          new Date(schedule1.startDate) - new Date(schedule2.startDate)
      )
      .filter((schedule) => new Date(schedule.startDate) > new Date());
  const nextSchedule =
    upcomingSchedules && upcomingSchedules.length > 0 && upcomingSchedules[0];
  const sd = new Date(
    (nextSchedule && nextSchedule.startDate) || event.start_date
  );
  const ed = new Date((nextSchedule && nextSchedule.endDate) || event.end_date);
  const week = weeks[sd.getDay()];
  const month = months[sd.getMonth()];
  const date = sd.getDate();
  const Hours = sd.getHours();
  const Minutes = sd.getMinutes();
  const offset = sd.getTimezoneOffset();
  const offsetText = `${offset < 0 ? '-' : '+'}${Math.floor(
    Math.abs(offset) / 60
  )}:${Math.abs(offset) % 60}`;
  const fullDateText = `${week} ${date} ${month}, ${Hours}:${Minutes}${
    Minutes > 9 ? '' : '0'
  } GMT${offsetText}`;
  const cd = new Date();
  let remainingSeconds = Math.max(Math.round((sd - cd) / 1000), 0);
  const remainingDays = Math.floor(remainingSeconds / 60 / 60 / 24);
  remainingSeconds -= remainingDays * 60 * 60 * 24;
  const remainingHours = Math.floor(remainingSeconds / 60 / 60);
  remainingSeconds -= remainingHours * 60 * 60;
  const remainingMinutes = Math.floor(remainingSeconds / 60);
  remainingSeconds -= remainingMinutes * 60;
  const remainingTimeText = `${remainingDays}${
    remainingDays > 0 ? 'D:' : ''
  }${remainingHours}H:${remainingMinutes}${
    remainingMinutes < 10 ? '0' : ''
  }min:${remainingSeconds}${remainingSeconds < 10 ? '0' : ''}s`;
  const locationText = `📍${event.location}`;
  const instructorName = `${event.instructor[0].firstName} ${event.instructor[0].lastName}`;
  const instructorImage = event.instructor[0].avatar[0].path;
  const instructorDetails = event.instructor[0].about;
  const instructorQualification = event.instructor[0].qualification;
  const noHours = Math.ceil((ed - sd) / 1000 / 60 / 60);
  const durationText = `${noHours} ${noHours > 1 ? 'hours' : 'hour'}`;
  const language = event.language;
  const knownFor = event.highlights.map((h, index) => ({
    id: index + 1,
    header: h.title,
    description: h.subtitle,
  }));
  const whatsIncluded = event.included.map((I, index) => ({
    key: index + 1,
    text: I,
  }));
  const guestsData = {
    signedUp: 10,
    yes: 10,
    no: 10,
    maybe: 10,
  };
  const currSubscribers =
    (event.subscribers &&
      event.subscribers[0] &&
      event.subscribers[0].totalusers) ||
    0;
  const remainingSpots = event.max_participants - currSubscribers;
  const [dateParams, setDateParams] = useState({ month, date, week });
  const [mobileCoverImage, setMobileCoverImage] = useState('');
  useEffect(() => {
    setMobileCoverImage(
      event.mobile_cover && event.mobile_cover[0] && event.mobile_cover[0].path
    );
  }, []);
  return (
    <div>
      {!event ? (
        <Skeleton />
      ) : (
        <div className={styles.mainContainer}>
          <nav className={styles.topNav}>
            <div className={styles.leftContainer}>
              <img
                className={styles.brandIcon}
                src="/images/Tussle_Favicon.png"
                alt="tussle logo"
              />
              <a href="https://www.tussle.fit" className={styles.brandName}>
                Tussle.fit
              </a>
            </div>
            <div className={styles.rightContainer}>
              <a href="https://www.tussle.fit" className={styles.navlink}>
                Support
              </a>
              <a
                href="https://www.tussle.fit/about-us"
                className={styles.navlink}
              >
                About
              </a>
              <button type="button" className={styles.navlink}>
                Log out
              </button>
            </div>
          </nav>
          <div className={styles.infoContainer1}>
            <p className={styles.breadCrump}>
              {tags.map((tag, index, arr) => (
                <span key={index}>
                  <span>{tag}</span>
                  <span>{index < arr.length - 1 ? ' | ' : null}</span>
                </span>
              ))}
            </p>
            <div className={styles.bottomPart}>
              <div className={styles.leftPart}>
                <h1 className={styles.title}>
                  {title} with {instructorName}
                </h1>
                <div className={styles.dateNLocation}>
                  <p className={styles.location}>{locationText}</p>
                </div>
              </div>
              {/* <div className={styles.share}>
              <img src="/images/shareIcon.svg" alt="shareicon" />
              <span>Share</span>
            </div> */}
            </div>
          </div>
          <div
            className={styles.heroCard}
            style={{ backgroundImage: `url(${coverImage})` }}
          >
            <div className={styles.calendarCard}>
              <div className={styles.month}>{dateParams.month}</div>
              <div className={styles.date}>{dateParams.date}</div>
              <div className={styles.week}>{dateParams.week}</div>
            </div>
          </div>
          <div className={styles.instructorInfo1}>
            <div className={styles.text}>
              <p className={styles.topLine}>
                Workshop hosted by {instructorName}
              </p>
              <p className={styles.bottomLine}>
                {durationText} · Hosted in {language}
              </p>
            </div>
            <div
              className={styles.image}
              style={{ backgroundImage: `url(${instructorImage})` }}
            />
          </div>
          <div className={styles.middleSection}>
            <div className={styles.left}>
              <p className={styles.header}>Event Information</p>
              <div className={styles.tagsContainer}>
                {tags.map((tag, index) => (
                  <span
                    key={index}
                    style={{ backgroundColor: tagColors[index] }}
                    className={styles.tag}
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <p className={styles.aboutHeader}>About the event</p>
              <div className={styles.aboutText}>
                {/* markdown */}

                <p className={markdownInputStyles.headings}>
                  Input description
                </p>
                <textarea
                  name="mdtext"
                  className={markdownInputStyles.mdinp}
                  cols="30"
                  rows="10"
                  value={MDText}
                  onChange={(e) => setMDText(e.target.value)}
                ></textarea>
                <p className={markdownInputStyles.headings}>Description</p>
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {MDText}
                </ReactMarkdown>
                {showMore ? (
                  <div style={{ margin: 0 }}>
                    <br />
                    <b>Topics Covered</b>
                    <ol className={styles.list}>
                      <li>List of Topics</li>
                    </ol>
                    <b>Who is this for?</b>
                    <p style={{ marginTop: 0 }}>
                      Expecting parents in 28 to 40 weeks of pregnancy
                    </p>
                  </div>
                ) : null}
                <div
                  style={{
                    cursor: 'pointer',
                    fontFamily: 'Proxima Nova Bold',
                    marginTop: '1.5rem',
                  }}
                  onClick={() => {
                    setShowMore(!showMore);
                  }}
                >
                  {showMore ? '...show less' : 'show more...'}
                </div>
              </div>
              <div className={styles.knownFor}>
                <p className={styles.header}>This workshop is known for</p>
                <div className={styles.highlights}>
                  {knownFor.map((kf) => (
                    <HighlightJamun
                      key={kf.id}
                      iconurl="/images/Calendar.svg"
                      header={kf.header}
                      description={kf.description}
                      className={styles.jamun}
                    />
                  ))}
                  <div className={styles.underline} />
                </div>
              </div>
              <div className={styles.whatsIncluded}>
                <p className={styles.header}>What&apos;s Included</p>
                <div className={styles.teaks}>
                  {whatsIncluded.map((wi) => (
                    <HighlightTeak
                      key={wi.id}
                      iconurl="/images/Calendar.svg"
                      text={wi.text}
                      className={styles.teak}
                    />
                  ))}
                </div>
              </div>
              <CardHippo
                instructorName={instructorName}
                instructorImage={instructorImage}
                instructorQualification={instructorQualification}
                instructorDetails={instructorDetails}
                instructorContactLink={event.instructor[0].contact_link}
                className={styles.hippo}
              />
            </div>
            <div className={styles.right}>
              <CardMantisShrimp
                className={styles.mantisShrimp}
                title={`${title} with ${instructorName}`}
                fullDate={fullDateText}
                eventLink={eventLink}
                guestsData={guestsData}
                remainingTimeText={remainingTimeText}
                location={event.location}
                remainingSpots={remainingSpots}
                priceText={priceText}
                setDateParams={setDateParams}
                schedules={event.eventschedules
                  .sort(
                    (schedule1, schedule2) =>
                      new Date(schedule1.startDate) -
                      new Date(schedule2.startDate)
                  )
                  .filter(
                    (schedule) => new Date(schedule.startDate) > new Date()
                  )}
                slug={event.slug}
              />
            </div>
          </div>
        </div>
      )}
      <div className={styles.mobileMainContainer}>
        <div
          className={styles.heroSection}
          style={{
            backgroundColor: 'rgba(0,0,0,0)',
            backgroundImage: `linear-gradient(transparent, black), url(${
              event.mobile_cover &&
              event.mobile_cover[0] &&
              event.mobile_cover[0].path
            })`,
            backgroundPosition: '0% 0%, center center',
            backgroundRepeat: 'repeat, no-repeat',
            backgroundSize: '100vw auto',
            backgroundOrigin: 'padding-box, padding-box',
            //backgroundAttachment: 'scroll, fixed',
            backgroundClip: 'border-box, border-box',
          }}
        >
          <p className={styles.brandName}>Tussle.fit</p>
          <p className={styles.title}>
            {title} with {instructorName}
          </p>
          <p className={styles.location}>{locationText}</p>
        </div>
        <div className={styles.instructorInfo4}>
          <div className={styles.text}>
            <p className={styles.topLine}>
              Workshop hosted by {instructorName}
            </p>
            <p className={styles.bottomLine}>
              {durationText} · Hosted in {language}
            </p>
          </div>
          <div
            className={styles.image}
            style={{ backgroundImage: `url(${instructorImage})` }}
          />
        </div>
        <div className={styles.eventInformation}>
          <p className={styles.label}>Event Information</p>
          <div className={styles.tagsContainer}>
            {tags.map((tag, index) => (
              <span
                key={index + 1}
                style={{ backgroundColor: tagColors[index] }}
                className={styles.tag}
              >
                {tag}
              </span>
            ))}
          </div>
          <p className={styles.eventLabel}>About the Event</p>
          <div className={styles.eventdescription}>
            <p>
              Welcome to the Labor & Birth Preparation Workshop! This workshop
              is specially designed for expecting parents who are looking to
              have a positive birthing experience. In this 2 hours live session,
              we will be covering how to promote optimal fetal positioning,
              exercises to help engage the baby and pelvic floor exercises to
              prevent tearing and episiotomy. We will be covering in detail
              Stages of Labor, what to expect at each stage and Natural Pain
              Management techniques you can employ for different stages. We will
              discuss how your partner can support you in this journey. Apart
              from this, we will also cover medical pain management options,
              common interventions to expect and what to do immediately
              postpartum.
            </p>
            <div style={{ margin: 0 }}>
              <br />
              <b>Topics Covered</b>
              <ol className={styles.list}>
                <li>How to promote Optimal Fetal Positioning</li>
                <li>Fetal Station</li>
                <li>Exercises to promote fetal head engagement</li>
                <li>Pelvic Floor Exercises - Kegels & Perineal Massage</li>
                <li>Signs of Labor</li>
                <li>True vs False Labor</li>
                <li>When to go to the hospital</li>
                <li>Stages of Labor</li>
                <li>How Labor works</li>
                <li>Natural Labor Pain Management techniques</li>
                <li>Role of Partner</li>
                <li>Common medical interventions</li>
                <li>Medical Pain management options</li>
                <li>C-section</li>
                <li>Immediate Postpartum.</li>
              </ol>
              <b>Who is this for?</b>
              <p style={{ marginTop: 0 }}>
                Expecting parents in 28 to 40 weeks of pregnancy
              </p>
            </div>
          </div>
        </div>
        <div className={styles.whatsIncluded}>
          <p className={styles.header}>
            <img src="/images/Vector.svg" />
            What&apos;s Included
          </p>
          <div className={styles.teaks}>
            {whatsIncluded.map((wi) => (
              <HighlightTeak
                key={wi.id}
                iconurl="/images/Calendar.svg"
                text={wi.text}
                className={styles.teak}
              />
            ))}
          </div>
        </div>
        <CardHippo
          instructorName={instructorName}
          instructorImage={instructorImage}
          instructorQualification={instructorQualification}
          instructorDetails={instructorDetails}
          instructorContactLink={event.instructor[0].contact_link}
          className={styles.hippo}
        />
        <div className={styles.actionContainer}>
          <p className={styles.price}>{priceText} per session</p>
          <button
            type="button"
            onClick={() => {
              setShowDateSelect(true);
            }}
            className={styles.chooseDateButton}
          >
            Select a Date
          </button>
        </div>
        {showDateSelect ? (
          <div
            id="dateSelectContainer"
            className={styles.dateSelect}
            onClick={(event) => {
              if (event.target.id !== 'dateSelectContainer') {
                return;
              }
              setShowDateSelect(false);
            }}
          >
            <div className={styles.upcomingDates}>
              <div className={styles.topSection}>
                <p className={styles.label}>Upcoming Dates</p>
                <img
                  className={styles.closeButton}
                  src="/images/close-button.svg"
                  onClick={() => setShowDateSelect(false)}
                />
              </div>
              {event.eventschedules
                .sort(
                  (schedule1, schedule2) =>
                    new Date(schedule1) - new Date(schedule2)
                )
                .filter((schedule) => new Date(schedule.startDate) > new Date())
                .map((schedule) => {
                  const om = -new Date().getTimezoneOffset();
                  const offsetMinutes =
                    (!importantTimezones.find((tz) => tz.offset === om) ||
                      event.slug ===
                        'labor--birth-preparation-workshop-with-bharti-goel-5kpycssfv7boxlu5yvuap') &&
                    schedule &&
                    schedule.timezone
                      ? knownTimezones.find(
                          (tz) => tz.abbreviation === schedule.timezone
                        ).offset
                      : null;
                  let sd = schedule
                    ? new Date(schedule.startDate)
                    : new Date(eventDetails.start_date);
                  let ed = schedule
                    ? new Date(schedule.endDate)
                    : new Date(eventDetails.end_date);
                  if (offsetMinutes) {
                    const currOffset = sd.getTimezoneOffset();
                    sd -= -(currOffset + offsetMinutes) * 60 * 1000;
                    ed -= -(currOffset + offsetMinutes) * 60 * 1000;
                    sd = new Date(sd);
                    ed = new Date(ed);
                  }
                  const startweek = weeks[sd.getDay()];
                  const startmonth = months[sd.getMonth()];
                  const startdate = sd.getDate();
                  const endweek = weeks[ed.getDay()];
                  const endmonth = months[ed.getMonth()];
                  const enddate = ed.getDate();
                  let starthours = sd.getHours();
                  const startampm = starthours >= 12 ? 'PM' : 'AM';
                  starthours %= 12;
                  starthours = starthours === 0 ? 12 : starthours;
                  let startminutes = sd.getMinutes();
                  startminutes =
                    startminutes < 10 ? `0${startminutes}` : startminutes;
                  let endhours = ed.getHours();
                  const endampm = endhours >= 12 ? 'PM' : 'AM';
                  endhours %= 12;
                  endhours = endhours === 0 ? 12 : endhours;
                  let endminutes = ed.getMinutes();
                  endminutes = endminutes < 10 ? `0${endminutes}` : endminutes;
                  const offset = -sd.getTimezoneOffset();
                  let offsetText = `GMT${offset < 0 ? '-' : '+'}${Math.floor(
                    Math.abs(offset) / 60
                  )}:${Math.abs(offset) % 60}`;
                  offsetText =
                    ((!importantTimezones.find((tz) => tz.offset === om) ||
                      event.slug ===
                        'labor--birth-preparation-workshop-with-bharti-goel-5kpycssfv7boxlu5yvuap') &&
                      schedule &&
                      schedule.timezone) ||
                    importantTimezones.find((tz) => tz.offset === om)
                      .abbreviation ||
                    offsetText;
                  return (
                    <div key={schedule._id} className={styles.twoSideField}>
                      <div className={styles.leftSide}>
                        <p className={styles.top}>
                          {startweek}, {startdate} {startmonth}
                        </p>
                        <p className={styles.bottom}>
                          {starthours}:{startminutes}
                          {startampm} - {endhours}:{endminutes}
                          {endampm} {offsetText}
                        </p>
                      </div>
                      <div className={styles.rightSide}>
                        <p>{priceText}/session</p>
                        <button
                          onClick={() => {
                            window.location = `${process.env.NEXT_PUBLIC_REACT_APP_URL}event/onboarding/${event.slug}?scheduleId=${schedule._id}`;
                          }}
                        >
                          Choose
                        </button>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default Index;
