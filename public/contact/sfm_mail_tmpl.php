<?php

/*--------------------------------------------------------------------------
	�ե�����᡼�� - sformmmail2
	(c)Sapphirus.Biz

	�����Υ�����ץȤ�ʸ�����󥳡��ɤ� euc-jp �����ѹ����ʤ��ǲ�������
--------------------------------------------------------------------------*/

// ����������Subject�ʷ�̾��
$mailSubject = '�����碌';

//������å�����
$mailMessage = <<< EOD
�������ƤˤƤ��䤤��碌������ޤ�����

�����碌����: {$sfm_mail->type}
��������: {$sfm_mail->document}
���̾: {$sfm_mail->company}
�եꥬ��: {$sfm_mail->company_furigana}
�ټҡ��ĶȽ�̾: {$sfm_mail->officename}
����̾: {$sfm_mail->divisionname}
��̾: {$sfm_mail->position}
��̾: {$sfm_mail->name}
�եꥬ��: {$sfm_mail->name_furigana}
͹���ֹ�: {$sfm_mail->zip2}
��ƻ�ܸ�̾: {$sfm_mail->pref21}
�Զ�Į¼������: {$sfm_mail->addr21}
�ӥ�̾�ʤ�: {$sfm_mail->addr22}
�����ֹ�: {$sfm_mail->tel}
�᡼�륢�ɥ쥹: {$sfm_mail->email}

���������: 
{$sfm_mail->text}

--

EOD;

?>
