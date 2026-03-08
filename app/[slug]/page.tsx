import { notFound } from 'next/navigation';
import { PEOPLE } from '@/lib/data';
import IndividualPage from '@/components/pages/IndividualPage';

export async function generateStaticParams() {
    return PEOPLE.map((person) => ({
        slug: person.slug,
    }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const person = PEOPLE.find((p) => p.slug === slug);

    if (!person) {
        return {
            title: 'Страница не найдена',
        };
    }

    return {
        title: `${person.name} - С 8 Марта! 💐`,
        description: `Персональное поздравление для ${person.name}`,
    };
}

export default async function PersonPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const person = PEOPLE.find((p) => p.slug === slug);

    if (!person) {
        notFound();
    }

    return <IndividualPage person={person} />;
}
