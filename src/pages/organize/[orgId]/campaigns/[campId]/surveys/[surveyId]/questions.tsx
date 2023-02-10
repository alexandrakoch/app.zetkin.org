import { GetServerSideProps } from 'next';
import { PageWithLayout } from 'utils/types';
import { scaffold } from 'utils/next';
import SurveyLayout from 'features/surveys/layout/SurveyLayout';

export const getServerSideProps: GetServerSideProps = scaffold(
  async (ctx) => {
    const { orgId, campId, surveyId } = ctx.params!;

    return {
      props: {
        campId,
        orgId,
        surveyId,
      },
    };
  },
  {
    authLevelRequired: 2,
    localeScope: ['layout.organize.surveys'],
  }
);

interface QuestionsPageProps {
  campId: string;
  orgId: string;
  surveyId: string;
}

const QuestionsPage: PageWithLayout<QuestionsPageProps> = () => {
  return <></>;
};
QuestionsPage.getLayout = function getLayout(page, props) {
  return (
    <SurveyLayout
      campaignId={props.campId}
      orgId={props.orgId}
      surveyId={props.surveyId}
    >
      {page}
    </SurveyLayout>
  );
};

export default QuestionsPage;
