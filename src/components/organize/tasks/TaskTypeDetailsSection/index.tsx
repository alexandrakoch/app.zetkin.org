import { Button } from '@material-ui/core';
import { useState } from 'react';
import { FormattedMessage as Msg, useIntl } from 'react-intl';
import { useMutation, useQueryClient } from 'react-query';

import patchTask from 'fetching/tasks/patchTask';
import ZetkinDialog from 'components/ZetkinDialog';
import ZetkinSection from 'components/ZetkinSection';
import { ZetkinTask } from 'types/zetkin';
import { AnyTaskTypeConfig, CollectDemographicsConfig, ShareLinkConfig, TASK_TYPE, VisitLinkConfig } from 'types/tasks';

import CollectDemographicsConfigForm from '../forms/CollectDemographicsConfigForm';
import ShareLinkConfigForm from '../forms/ShareLinkConfigForm';
import VisitLinkConfigForm from '../forms/VisitLinkConfigForm';

import CollectDemographicsDetails from './CollectDemographicsDetails';
import ShareLinkDetails from './ShareLinkDetails';
import VisitLinkDetails from './VisitLinkDetails';


interface TaskTypeDetailsProps {
    task: ZetkinTask;
}

const TaskTypeDetailsSection: React.FunctionComponent<TaskTypeDetailsProps> = ({ task }) => {
    const queryClient = useQueryClient();
    const intl = useIntl();
    const [editConfigDialog, setEditConfigDialog] = useState<TASK_TYPE>();
    const closeDialog = () => setEditConfigDialog(undefined);

    const patchTaskMutation = useMutation(patchTask(task.organization.id, task.id), {
        onSettled: () => queryClient.invalidateQueries('task'),
    });

    const handlePatchTaskConfig = (config: AnyTaskTypeConfig) => {
        patchTaskMutation.mutate({ config });
        closeDialog();
    };

    if (task.type === TASK_TYPE.OFFLINE) return null;

    return (
        <>
            <ZetkinSection
                action={
                    <Button
                        color="primary"
                        onClick={ () => {
                            setEditConfigDialog(task.type);
                        } }>
                        <Msg id="misc.tasks.taskTypeDetails.editButton" />
                    </Button>
                }
                title={ intl.formatMessage({ id: `misc.tasks.taskTypeDetails.${task.type}.title` }) }>
                { /* Config Properties */ }
                { task.type === TASK_TYPE.VISIT_LINK && (
                    <VisitLinkDetails taskConfig={ task.config as VisitLinkConfig } />
                ) }
                { task.type === TASK_TYPE.SHARE_LINK && (
                    <ShareLinkDetails taskConfig={ task.config as ShareLinkConfig } />
                ) }
                { task.type === TASK_TYPE.COLLECT_DEMOGRAPHICS && (
                    <CollectDemographicsDetails taskConfig={ task.config as CollectDemographicsConfig } />
                ) }


            </ZetkinSection>

            { /* Dialogs */ }
            <ZetkinDialog
                onClose={ closeDialog }
                open={ editConfigDialog === TASK_TYPE.VISIT_LINK }
                title={ intl.formatMessage({ id: 'misc.tasks.forms.visitLinkConfig.title' }) }>
                <VisitLinkConfigForm
                    onCancel={ closeDialog }
                    onSubmit={ (config) => handlePatchTaskConfig(config) }
                    taskConfig={ task.config as VisitLinkConfig }
                />
            </ZetkinDialog>
            <ZetkinDialog
                onClose={ closeDialog }
                open={ editConfigDialog === TASK_TYPE.SHARE_LINK }
                title={ intl.formatMessage({ id: 'misc.tasks.forms.shareLinkConfig.title' }) }>
                <ShareLinkConfigForm
                    onCancel={ closeDialog }
                    onSubmit={ (config) => handlePatchTaskConfig(config) }
                    taskConfig={ task.config as ShareLinkConfig }
                />
            </ZetkinDialog>
            <ZetkinDialog
                onClose={ closeDialog }
                open={ editConfigDialog === TASK_TYPE.COLLECT_DEMOGRAPHICS }
                title={ intl.formatMessage({ id: 'misc.tasks.forms.collectDemographicsConfig.title' }) }>
                <CollectDemographicsConfigForm
                    onCancel={ closeDialog }
                    onSubmit={ (config) => handlePatchTaskConfig(config) }
                    taskConfig={ task.config as CollectDemographicsConfig }
                />
            </ZetkinDialog>
        </>
    );
};

export default TaskTypeDetailsSection;
