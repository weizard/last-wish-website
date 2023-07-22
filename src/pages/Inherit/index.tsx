import { Button } from 'src/components/Button';
import { Container } from 'src/components/Container';

interface Props {
  className?: string;
  children?: React.ReactNode;
}

const Td = ({ className, children }: Props) => <th className={className ?? 'border border-slate-600'}>{children}</th>;

export function Inherit() {
  return (
    <Container title="inherit">
      Safe Management
      <table className="border-separate border border-slate-500">
        <thead>
          <tr>
            <th className="border border-slate-600">safe</th>
            <th className="border border-slate-600">peroid</th>
            <th className="border border-slate-600">status</th>
            <th className="border border-slate-600">action</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <Td>0x0000000000000000000000000000000000000000</Td>
            <Td>10 days</Td>
            <Td>pending</Td>
            <Td>
              <Button>remove</Button>
            </Td>
          </tr>
        </tbody>
      </table>
    </Container>
  );
}
