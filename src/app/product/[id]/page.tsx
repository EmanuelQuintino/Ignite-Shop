type Props = {
  params: { id: string };
};

export default function Product({ params }: Props) {
  return <h1>Product #{params.id}</h1>;
}
