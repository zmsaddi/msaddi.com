export default async function BlogPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  return (
    <div>
      <h1>Blog Page - {locale}</h1>
      <p>This is a test blog page.</p>
    </div>
  );
}
