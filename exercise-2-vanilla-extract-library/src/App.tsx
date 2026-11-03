import { Badge, Button, Card, CardBody, CardTitle } from './components';
import { cardGrid, page, row, section, sectionHeading } from './App.css';

export default function App() {
  return (
    <main className={page}>
      <header>
        <h1 style={{ margin: 0 }}>Component Library</h1>
        <p style={{ margin: '4px 0 0', opacity: 0.7 }}>
          Button, Card and Badge, styled with Vanilla Extract.
        </p>
      </header>

      <section className={section} aria-labelledby="buttons-heading">
        <h2 id="buttons-heading" className={sectionHeading}>Button: variants</h2>
        <div className={row}>
          <Button variant="primary">Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="danger">Danger</Button>
        </div>

        <h2 className={sectionHeading}>Button: sizes</h2>
        <div className={row}>
          <Button size="sm">Small</Button>
          <Button size="md">Medium</Button>
          <Button size="lg">Large</Button>
        </div>

        <h2 className={sectionHeading}>Button: disabled</h2>
        <div className={row}>
          <Button variant="primary" disabled>Primary</Button>
          <Button variant="secondary" disabled>Secondary</Button>
          <Button variant="danger" disabled>Danger</Button>
        </div>
      </section>

      <section className={section} aria-labelledby="badges-heading">
        <h2 id="badges-heading" className={sectionHeading}>Badge</h2>
        <div className={row}>
          <Badge tone="success">Success</Badge>
          <Badge tone="warning">Warning</Badge>
          <Badge tone="error">Error</Badge>
          <Badge tone="neutral">Neutral</Badge>
        </div>
      </section>

      <section className={section} aria-labelledby="cards-heading">
        <h2 id="cards-heading" className={sectionHeading}>Card</h2>
        <div className={cardGrid}>
          <Card>
            <CardTitle>Order #1042</CardTitle>
            <CardBody>Shipped yesterday. Expected delivery in two days.</CardBody>
            <div className={row}>
              <Badge tone="success">Delivered</Badge>
              <Button size="sm" variant="secondary">View</Button>
            </div>
          </Card>
          <Card>
            <CardTitle>Payment review</CardTitle>
            <CardBody>A card on file needs to be re-verified before the next charge.</CardBody>
            <div className={row}>
              <Badge tone="warning">Pending</Badge>
              <Button size="sm" variant="danger">Cancel order</Button>
            </div>
          </Card>
        </div>
      </section>
    </main>
  );
}
