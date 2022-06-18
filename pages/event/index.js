import Link from 'next/link';
import eventPageStyles from './index.module.scss';

function Index(events) {
  const eventsData = events.events;
  return (
    <>
      <div className={eventPageStyles.mainDiv}>
        <p className={eventPageStyles.mainHeading}>Upcoming Events</p>

        {eventsData.map((event, index) => (
          <div
            key={index}
            style={{ color: 'black' }}
            className={eventPageStyles.eventCard}
          >
            <Link href={`event/${event.slug}`}>{event.title}</Link>
          </div>
        ))}
      </div>
    </>
  );
}

const server = process.env.NEXT_PUBLIC_BACKEND_URL;

export async function getStaticProps() {
  const eventsData = await fetch(`${server}api/challenge?type=EVENT`).then(
    (r) => r.json()
  );
  return {
    props: {
      events: eventsData.response.data,
    },
  };
}

export default Index;
