�t�H�[�����[�� - sformmmail2 �̐���
(c)Sapphirus.Biz


�y�t�@�C���\���ɂ��āz
���L��6�t�@�C���ō\������܂��B
sformmail.php - ���C���v���O����
sfm_config.php - �ݒ�t�@�C��
sformmail.css - ���ʃX�^�C���V�[�g�iCSS�j
sfm_form.html - ���̓t�H�[���ihtml�t�@�C���j
sfm_confirm.html - �m�F��ʁihtml�t�@�C���j
sfm_completion.html - ���M������ʁihtml�t�@�C���j
sfm_mail_tmpl.php - ���M���[���p�e���v���[�g
sfm_reply_tmpl.php - �����ԐM���[���p�e���v���[�g


�y����ɂ��āz
��FTP�\�t�g���ŁA��L�̃t�@�C����C�ӂ̏ꏊ�ɃA�b�v���[�h���܂��B�u���E�U�� sformmail.php�i�f�t�H���g�̏ꍇ�j�փA�N�Z�X����Ɠ��̓t�H�[����ǂݍ��ݕ\������܂��B
����m�F�Ƃ��� sfm_config.php ���� $mailTo[0] ���A�󂯎�邱�Ƃ̂ł��郁�[���A�h���X�ɐݒ肵�Asformmail.php �փA�N�Z�X���ăt�H�[�����́`���M���m�F���ĉ������B


�y���̓t�H�[���̐ݒ�ɂ��āz
���t�H�[���̒��� input name �Ɂu_s�v�I�v�V����������ƕK�{���ڂ̈����ƂȂ�܂��B
��) 
<input type="text" name="age_s" />

��input name �Ɂuemail�v���w�肷��ƃ��[���A�h���X�Ƃ��Ĉ����܂��B�i��`�ς݁j
��j
<input type="text" name="email" />

��input name �Ɂuemailcheck�v���w�肷��ƃ��[���A�h���X�̍ē��͂̊m�F�����邱�Ƃ��ł��܂��B
���uemail�v���g�p���Ă��Ȃ��ꍇ�́A�uemailcheck�v���g�p���Ȃ��ŉ������B
��j
<input type="text" name="emailcheck" />

�����̓t�H�[���isfm_form.html�j���̂ǂ����ɔ�\���t�B�[���h�Ƃ��āumode="CONFIRM"�v�iCONFIRM �͑啶���j��K���ݒ肵�ĉ������B���̎w�肪�Ȃ��Ɗm�F��ʂɈڂ�܂���B
��j
<input name="mode" type="hidden" value="CONFIRM" />

�����l�Ɋm�F��ʁisfm_confirm.html�j�ɂ͔�\���t�B�[���h�Łumode="SEND"�v�iSEND �͑啶���j��K���ݒu���ĉ������B���̎w�肪�����Ƒ��M�������s�����Ƃ��ł��܂���B
��j
<input name="mode" type="hidden" value="SEND" />

�����̓t�H�[���������͊m�F��ʂŁuname="autoReply"�v��ݒ肷��ƁA���͂��ꂽ���[���A�h���X�Ɏ����ԐM���邱�Ƃ��ł��܂��B�uname="autoReply"�v�ɑ΂��ēK���Ȓl�ivalue�j���w�肵�ĉ������B
��j
<input name="autoReply" type="hidden" value="1" />
�������� <input name="autoReply" type="checkbox" value="�󂯎��" /> ��
��email �܂��� autoReply ���ڂ܂��� reply.php �t�@�C���̂ǂꂩ�������ꍇ�͖����ɂȂ�܂��B

�������G���R�[�h�̐ݒ�Ɋւ��ăf�t�H���g�ݒ�y�ѕt���� HTML �t�@�C���́ueuc-jp�v�ł��B
�����G���R�[�h��ύX����ꍇ�A
sfm_form.html
sfm_confirm.html
sfm_completion.html
��3��ނ� HTML �𕶎��G���R�[�h�̕ύX�ł���e�L�X�g�G�f�B�^���ŕۑ��������ĉ������B
�������ł� euc-jp �Œ��ԏ��������Ă���̂ŁAPHP �t�@�C���ɂ��Ă͕ύX���Ȃ��ŉ������B

���󂯎�郁�[���A�h���X���I�����邱�Ƃ��ł��܂��B�܂��A�ݒ�t�@�C���isfm_config.php�j�ɂ���u$mailTo[0�`2]�v�ɂ��ꂼ�ꃁ�[���A�h���X���L�q���܂��B���̓t�H�[���Ɂuname="mailToNum"�v��ݒ肵�l���w�肷�邱�Ƃɂ��A���ꂼ��Ή��������[���A�h���X�ɑ΂����M���邱�Ƃ��ł��܂��B
��j
<select name="mailToNum">
<option value="0">����</option>
<option value="1">�Z�p</option>
<option value="2">�c��</option>
</select>
mailToNum ���u1�v�̏ꍇ�A$mailTo[1] �̃��[���A�h���X�ɑ΂��đ��M����܂��B
��$mailTo[0] �͎󂯎���Ƃ��ĕK���ݒ肵�ĉ������B

��checkbox ���A�����̒l���擾���邱�Ƃ�����ꍇ�Aname �Ɂufood[0]�v�̂悤�Ɋp���ʂ�t���āA�A�Ԃɂ��ĉ������B�܂��A�K�{���ڂ̏ꍇ�́ufood_s[0]�v�̂悤�Ɂu_s�v���ԂɎw�肵�܂��Bcheckbox �̂悤�ȏꍇ�̒��ӂƂ��āAname �ɑ΂��Ĉ���I���������i�l�������j�ꍇ�Aname ���̂����݂��Ȃ����ƂɂȂ��Ă��܂����߁A���炩���ߋ�� name �� hidden ���ŗp�ӂ��Ă����K�v������܂��B
��j
<input name="food" type="hidden" value="none" />
<input name="food[0]" type="checkbox" value="���[����" />
<input name="food[1]" type="checkbox" value="�J���[���C�X" />
<input name="food[2]" type="checkbox" value="�p�X�^" />
��[]��t���邱�Ƃɂ��PHP�����ŕ������ڂ��܂Ƃ߂��z��Ƃ��ď�������܂��B

����̒l��ݒ肷��ꍇ�́Avalue �Ɂu""�v�̂悤�ɉ����Ȃ��l��ݒ肷�邩�A�������́u"none"�v�Ƃ���Ƌ�f�[�^�Ƃ��Ĉ����܂��Bselect �� checkbox ���ŏ����l�Ƃ��ĉ����I������Ă��Ȃ����ȂǂɎg�p���ĉ������B
��j
<input name="item_select" type="hidden" value="" />
�������� <input name="item_select" type="hidden" value="none" />


�y���̑��̐ݒ�ɂ��āz
��$maxText �͊e���͍��ڂɑ΂��ď������邱�Ƃ̂ł���ő啶�����i���p�j�ł��B

��$mailBcc �́A�t�H�[�����瑗�M����郁�[���� BCC �Ƃ��Ă��󂯎�肽���ꍇ�ɁA���[���A�h���X���w�肷�邱�Ƃɂ���ė��p�ł��܂��B

��$replyBcc �́A�����ԐM����郁�[���� BCC �Ƃ��Ă��󂯎�肽���ꍇ�ɁA���[���A�h���X���w�肷�邱�Ƃɂ���ė��p�ł��܂��B

��$replyAddress �́A�����ԐM���[���ɑ΂����M���̃A�h���X��ύX�������ꍇ�ɁA���[���A�h���X���w�肷�邱�Ƃɂ���ė��p�ł��܂��B

��$replyName �́A�����ԐM���[���̑��M�����[���A�h���X�ɑ΂����O��t�����邱�Ƃ��ł��܂��B���{����G���R�[�h�������s���܂��̂Ŏg�p�\�ł��B

��$returnPath �́A���[�����M�G���[�ɂȂ����ꍇ�̎󂯎���Ƃ��ĕύX�������ꍇ�ɁA���[���A�h���X���w�肷�邱�Ƃɂ���ė��p�ł��܂��B


�y���C���v���O�����̐ݒ�ɂ��āz
�v���O�����𗘗p�����ŁAPHP �̎d�l�ɂ���ē���ɉe�����o���ꍇ�ɑΉ����邽�߂̐ݒ�ł��B

��$refCheck �́A���t�@���ɂ��`�F�b�N�ŊO�����璼�ڗ��p�����\����h���܂��B

��$ill_char �́A�����������N�����Ă��܂��ꍇ�ɕύX���܂��B

��$use_ssl �́Ahttps �ŗ��p����ꍇ�ɐݒ肵�܂��B
���h���C���� secure �������� ssl ���܂܂��ꍇ�͏�ɐݒ肳��܂��B

��$baseEnc �́AHTML �ŗ��p����G���R�[�h���w��i�K�v�ȏꍇ�̂݁j
�����ł� sfm_form.html �ɍ��킹�����o�͏������s���܂����A���܂��G���R�[�h�ł��������������N����悤�ł�����A���C���v���O�����isformmail.php�j���́u$baseEnc�v���g�p���镶���G���R�[�h�ɕύX���ĉ������B

���e�e���v���[�g�̃t�@�C������ύX�������ꍇ�A$temp_html ���̊Y���t�@�C������ύX���ĉ������B

�����̓G���[�̕\����ύX�������ꍇ�A$temp_err ���̊Y�����b�Z�[�W��ύX���ĉ������B

���������ڂ��������ĕ\�����������ꍇ�A$name_marge ���� input name �� ���ڂ��Ȃ��L����ݒ肵�܂��B
��j
<input name="tel_s[0]" type="text" />
<input name="tel_s[1]" type="text" />
<input name="tel_s[2]" type="text" />
�̃t�H�[��������A���ꂼ��u0000�v�u1111�v�u2222�v�ƋL�����ꂽ�ꍇ�A'tel' => '-' ��ݒ肷��� tel �ɂ́u0000-1111-2222�v���i�[����܂��B


�y���̑��z
�t�H�[���ŕK�v�� input ���ڂ�������x�܂߂��T���v�� HTML ��p�ӂ��܂����B�t�H�[�� HTML ���쐬����ۂɂ��Q�l������΂Ǝv���܂��B
���o�[�W���� 2.50 ���d�l��ύX���܂����B�ݒ�t�@�C����e���v���[�g���̋L�q��ύX���܂����B�������A�ȑO�̃e���v���[�g�����̂܂܁usformmail.php�v�̍����ւ��ŗ��p�ł���悤�ɂȂ��Ă��܂��B
���o�[�W���� 1.xx �Ƃ̓e���v���[�g���t�@�C���̌݊���������܂���B
