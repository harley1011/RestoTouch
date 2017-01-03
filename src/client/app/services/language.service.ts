import {Injectable}     from '@angular/core';
import {Language} from '../shared/models/language';
import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';
import {ReplaySubject} from 'rxjs/ReplaySubject';
import  {ApiEndpointService} from './api-endpoint.service';
import {AuthHttpService} from './auth-http.services';
import {Response} from '@angular/http';

@Injectable()
export class LanguageService {

  selectedLanguageAnnounced$: Observable<Language>;
  supportedLanguagesAnnounced$: Observable<Array<Language>>;

  private selectedLanguageAnnounced = new Subject<Language>();
  private supportedLanguagesAnnounced = new Subject<Array<Language>>();
  private supportedLanguages: Array<Language> = [];
  private selectedLanguage: Language;
  private url = '/supportedLanguages';
  private isoLanguages = [new Language('ab', 'Abkhaz', 'аҧсуа', 2),
    new Language('aa', 'Afar', 'Afaraf', 2),
    new Language('af', 'Afrikaans', 'Afrikaans', 2),
    new Language('ak', 'Akan', 'Akan', 2),
    new Language('sq', 'Albanian', 'Shqip', 2),
    new Language('am', 'Amharic', 'አማርኛ', 2),
    new Language('ar', 'Arabic', 'العربية', 2),
    new Language('an', 'Aragonese', 'Aragonés', 2),
    new Language('hy', 'Armenian', 'Հայերեն', 2),
    new Language('as', 'Assamese', 'অসমীয়া', 2),
    new Language('av', 'Avaric', 'авар мацӀ, магӀарул мацӀ', 2),
    new Language('ae', 'Avestan', 'avesta', 2),
    new Language('ay', 'Aymara', 'aymar aru', 2),
    new Language('az', 'Azerbaijani', 'azərbaycan dili', 2),
    new Language('bm', 'Bambara', 'bamanankan', 2),
    new Language('ba', 'Bashkir', 'башҡорт теле', 2),
    new Language('eu', 'Basque', 'euskara, euskera', 2),
    new Language('be', 'Belarusian', 'Беларуская', 2),
    new Language('bn', 'Bengali', 'বাংলা', 2),
    new Language('bh', 'Bihari', 'भोजपुरी', 2),
    new Language('bi', 'Bislama', 'Bislama', 2),
    new Language('bs', 'Bosnian', 'bosanski jezik', 2),
    new Language('br', 'Breton', 'brezhoneg', 2),
    new Language('bg', 'Bulgarian', 'български език', 2),
    new Language('my', 'Burmese', 'ဗမာစာ', 2),
    new Language('ca', 'Catalan; Valencian', 'Català', 2),
    new Language('ch', 'Chamorro', 'Chamoru', 2),
    new Language('ce', 'Chechen', 'нохчийн мотт', 2),
    new Language('ny', 'Chichewa; Chewa; Nyanja', 'chiCheŵa, chinyanja', 2),
    new Language('zh', 'Chinese', '中文 (Zhōngwén), 汉语, 漢語', 2),
    new Language('cv', 'Chuvash', 'чӑваш чӗлхи', 2),
    new Language('kw', 'Cornish', 'Kernewek', 2),
    new Language('co', 'Corsican', 'corsu, lingua corsa', 2),
    new Language('cr', 'Cree', 'ᓀᐦᐃᔭᐍᐏᐣ', 2),
    new Language('hr', 'Croatian', 'hrvatski', 2),
    new Language('cs', 'Czech', 'česky, čeština', 2),
    new Language('da', 'Danish', 'dansk', 2),
    new Language('dv', 'Divehi; Dhivehi; Maldivian;', 'ދިވެހި', 2),
    new Language('nl', 'Dutch', 'Nederlands, Vlaams', 2),
    new Language('en', 'English', 'English', 1),
    new Language('eo', 'Esperanto', 'Esperanto', 2),
    new Language('et', 'Estonian', 'eesti, eesti keel', 2),
    new Language('ee', 'Ewe', 'Eʋegbe', 2),
    new Language('fo', 'Faroese', 'føroyskt', 2),
    new Language('fj', 'Fijian', 'vosa Vakaviti', 2),
    new Language('fi', 'Finnish', 'suomi, suomen kieli', 2),
    new Language('fr', 'French', 'français, langue française', 1),
    new Language('ff', 'Fula; Fulah; Pulaar; Pular', 'Fulfulde, Pulaar, Pular', 2),
    new Language('gl', 'Galician', 'Galego', 2),
    new Language('ka', 'Georgian', 'ქართული', 2),
    new Language('de', 'German', 'Deutsch', 2),
    new Language('el', 'Greek, Modern', 'Ελληνικά', 2),
    new Language('gn', 'Guaraní', 'Avañeẽ', 2),
    new Language('gu', 'Gujarati', 'ગુજરાતી', 2),
    new Language('ht', 'Haitian; Haitian Creole', 'Kreyòl ayisyen', 2),
    new Language('ha', 'Hausa', 'Hausa, هَوُسَ', 2),
    new Language('he', 'Hebrew (modern)', 'עברית', 2),
    new Language('hz', 'Herero', 'Otjiherero', 2),
    new Language('hi', 'Hindi', 'हिन्दी, हिंदी', 2),
    new Language('ho', 'Hiri Motu', 'Hiri Motu', 2),
    new Language('hu', 'Hungarian', 'Magyar', 2),
    new Language('ia', 'Interlingua', 'Interlingua', 2),
    new Language('id', 'Indonesian', 'Bahasa Indonesia', 2),
    new Language('ie', 'Interlingue', 'Originally called Occidental; then Interlingue after WWII', 2),
    new Language('ga', 'Irish', 'Gaeilge', 2),
    new Language('ig', 'Igbo', 'Asụsụ Igbo', 2),
    new Language('ik', 'Inupiaq', 'Iñupiaq, Iñupiatun', 2),
    new Language('io', 'Ido', 'Ido', 2),
    new Language('is', 'Icelandic', 'Íslenska', 2),
    new Language('it', 'Italian', 'Italiano', 2),
    new Language('iu', 'Inuktitut', 'ᐃᓄᒃᑎᑐᑦ', 2),
    new Language('ja', 'Japanese', '日本語 (にほんご／にっぽんご)', 2),
    new Language('jv', 'Javanese', 'basa Jawa', 2),
    new Language('kl', 'Kalaallisut, Greenlandic', 'kalaallisut, kalaallit oqaasii', 2),
    new Language('kn', 'Kannada', 'ಕನ್ನಡ', 2),
    new Language('kr', 'Kanuri', 'Kanuri', 2),
    new Language('ks', 'Kashmiri', 'कश्मीरी, كشميري‎', 2),
    new Language('kk', 'Kazakh', 'Қазақ тілі', 2),
    new Language('km', 'Khmer', 'ភាសាខ្មែរ', 2),
    new Language('ki', 'Kikuyu, Gikuyu', 'Gĩkũyũ', 2),
    new Language('rw', 'Kinyarwanda', 'Ikinyarwanda', 2),
    new Language('ky', 'Kirghiz, Kyrgyz', 'кыргыз тили', 2),
    new Language('kv', 'Komi', 'коми кыв', 2),
    new Language('kg', 'Kongo', 'KiKongo', 2),
    new Language('ko', 'Korean', '한국어 (韓國語), 조선말 (朝鮮語)', 2),
    new Language('ku', 'Kurdish', 'Kurdî, كوردی‎', 2),
    new Language('kj', 'Kwanyama, Kuanyama', 'Kuanyama', 2),
    new Language('la', 'Latin', 'latine, lingua latina', 2),
    new Language('lb', 'Luxembourgish, Letzeburgesch', 'Lëtzebuergesch', 2),
    new Language('lg', 'Luganda', 'Luganda', 2),
    new Language('li', 'Limburgish, Limburgan, Limburger', 'Limburgs', 2),
    new Language('ln', 'Lingala', 'Lingála', 2),
    new Language('lo', 'Lao', 'ພາສາລາວ', 2),
    new Language('lt', 'Lithuanian', 'lietuvių kalba', 2),
    new Language('lu', 'Luba-Katanga', '', 2),
    new Language('lv', 'Latvian', 'latviešu valoda', 2),
    new Language('gv', 'Manx', 'Gaelg, Gailck', 2),
    new Language('mk', 'Macedonian', 'македонски јазик', 2),
    new Language('mg', 'Malagasy', 'Malagasy fiteny', 2),
    new Language('ms', 'Malay', 'bahasa Melayu, بهاس ملايو‎', 2),
    new Language('ml', 'Malayalam', 'മലയാളം', 2),
    new Language('mt', 'Maltese', 'Malti', 2),
    new Language('mi', 'Māori', 'te reo Māori', 2),
    new Language('mr', 'Marathi (Marāṭhī)', 'मराठी', 2),
    new Language('mh', 'Marshallese', 'Kajin M̧ajeļ', 2),
    new Language('mn', 'Mongolian', 'монгол', 2),
    new Language('na', 'Nauru', 'Ekakairũ Naoero', 2),
    new Language('nv', 'Navajo, Navaho', 'Diné bizaad, Dinékʼehǰí', 2),
    new Language('nb', 'Norwegian Bokmål', 'Norsk bokmål', 2),
    new Language('nd', 'North Ndebele', 'isiNdebele', 2),
    new Language('ne', 'Nepali', 'नेपाली', 2),
    new Language('ng', 'Ndonga', 'Owambo', 2),
    new Language('nn', 'Norwegian Nynorsk', 'Norsk nynorsk', 2),
    new Language('no', 'Norwegian', 'Norsk', 2),
    new Language('ii', 'Nuosu', 'ꆈꌠ꒿ Nuosuhxop', 2),
    new Language('nr', 'South Ndebele', 'isiNdebele', 2),
    new Language('oc', 'Occitan', 'Occitan', 2),
    new Language('oj', 'Ojibwe, Ojibwa', 'ᐊᓂᔑᓈᐯᒧᐎᓐ', 2),
    new Language('cu', 'Old Church Slavonic, Church Slavic, Church Slavonic, Old Bulgarian, Old Slavonic', 'ѩзыкъ словѣньскъ', 2),
    new Language('om', 'Oromo', 'Afaan Oromoo', 2),
    new Language('or', 'Oriya', 'ଓଡ଼ିଆ', 2),
    new Language('os', 'Ossetian, Ossetic', 'ирон æвзаг', 2),
    new Language('pa', 'Panjabi, Punjabi', 'ਪੰਜਾਬੀ, پنجابی‎', 2),
    new Language('pi', 'Pāli', 'पाऴि', 2),
    new Language('fa', 'Persian', 'فارسی', 2),
    new Language('pl', 'Polish', 'polski', 2),
    new Language('ps', 'Pashto, Pushto', 'پښتو', 2),
    new Language('pt', 'Portuguese', 'Português', 2),
    new Language('qu', 'Quechua', 'Runa Simi, Kichwa', 2),
    new Language('rm', 'Romansh', 'rumantsch grischun', 2),
    new Language('rn', 'Kirundi', 'kiRundi', 2),
    new Language('ro', 'Romanian, Moldavian, Moldovan', 'română', 2),
    new Language('ru', 'Russian', 'русский язык', 2),
    new Language('sa', 'Sanskrit (Saṁskṛta)', 'संस्कृतम्', 2),
    new Language('sc', 'Sardinian', 'sardu', 2),
    new Language('sd', 'Sindhi', 'सिन्धी, سنڌي، سندھی‎', 2),
    new Language('se', 'Northern Sami', 'Davvisámegiella', 2),
    new Language('sm', 'Samoan', 'gagana faa Samoa', 2),
    new Language('sg', 'Sango', 'yângâ tî sängö', 2),
    new Language('sr', 'Serbian', 'српски језик', 2),
    new Language('gd', 'Scottish Gaelic; Gaelic', 'Gàidhlig', 2),
    new Language('sn', 'Shona', 'chiShona', 2),
    new Language('si', 'Sinhala, Sinhalese', 'සිංහල', 2),
    new Language('sk', 'Slovak', 'slovenčina', 2),
    new Language('sl', 'Slovene', 'slovenščina', 2),
    new Language('so', 'Somali', 'Soomaaliga, af Soomaali', 2),
    new Language('st', 'Southern Sotho', 'Sesotho', 2),
    new Language('es', 'Spanish; Castilian', 'español, castellano', 2),
    new Language('su', 'Sundanese', 'Basa Sunda', 2),
    new Language('sw', 'Swahili', 'Kiswahili', 2),
    new Language('ss', 'Swati', 'SiSwati', 2),
    new Language('sv', 'Swedish', 'svenska', 2),
    new Language('ta', 'Tamil', 'தமிழ்', 2),
    new Language('te', 'Telugu', 'తెలుగు', 2),
    new Language('tg', 'Tajik', 'тоҷикӣ, toğikī, تاجیکی‎', 2),
    new Language('th', 'Thai', 'ไทย', 2),
    new Language('ti', 'Tigrinya', 'ትግርኛ', 2),
    new Language('bo', 'Tibetan Standard, Tibetan, Central', 'བོད་ཡིག', 2),
    new Language('tk', 'Turkmen', 'Türkmen, Түркмен', 2),
    new Language('tl', 'Tagalog', 'Wikang Tagalog, ᜏᜒᜃᜅ᜔ ᜆᜄᜎᜓᜄ᜔', 2),
    new Language('tn', 'Tswana', 'Setswana', 2),
    new Language('to', 'Tonga (Tonga Islands)', 'faka Tonga', 2),
    new Language('tr', 'Turkish', 'Türkçe', 2),
    new Language('ts', 'Tsonga', 'Xitsonga', 2),
    new Language('tt', 'Tatar', 'татарча, tatarça, تاتارچا‎', 2),
    new Language('tw', 'Twi', 'Twi', 2),
    new Language('ty', 'Tahitian', 'Reo Tahiti', 2),
    new Language('ug', 'Uighur, Uyghur', 'Uyƣurqə, ئۇيغۇرچە‎', 2),
    new Language('uk', 'Ukrainian', 'українська', 2),
    new Language('ur', 'Urdu', 'اردو', 2),
    new Language('uz', 'Uzbek', 'zbek, Ўзбек, أۇزبېك‎', 2),
    new Language('ve', 'Venda', 'Tshivenḓa', 2),
    new Language('vi', 'Vietnamese', 'Tiếng Việt', 2),
    new Language('vo', 'Volapük', 'Volapük', 2),
    new Language('wa', 'Walloon', 'Walon', 2),
    new Language('cy', 'Welsh', 'Cymraeg', 2),
    new Language('wo', 'Wolof', 'Wollof', 2),
    new Language('fy', 'Western Frisian', 'Frysk', 2),
    new Language('xh', 'Xhosa', 'isiXhosa', 2),
    new Language('yi', 'Yiddish', 'ייִדיש', 2),
    new Language('yo', 'Yoruba', 'Yorùbá', 2),
    new Language('za', 'Zhuang, Chuang', 'Saɯ cueŋƅ, Saw cuengh', 2)];
  private replaySubjectLanguages = new ReplaySubject<Array<Language>>();
  private replaySubjectSelectedLanguage = new ReplaySubject<Language>();

  constructor(private http: AuthHttpService, private api: ApiEndpointService) {
    this.selectedLanguageAnnounced$ = this.selectedLanguageAnnounced.asObservable();
    this.supportedLanguagesAnnounced$ = this.supportedLanguagesAnnounced.asObservable();

    this.http.get(this.api.getEndpoint() + this.url).map(this.extractData).subscribe(languages => {
        this.replaySubjectLanguages.next(languages);
        if (!this.selectedLanguage) {
          this.setSelectedLanguage(languages[0]);
        }
      }
    );
  }
  getSelectedLanguage(): ReplaySubject<Language> {
    return this.replaySubjectSelectedLanguage;
  }

  languages(): Array<Language> {
    return this.isoLanguages;
  }

  announceSelectedLanguage(language: Language) {
    this.selectedLanguageAnnounced.next(language);
  }

  announceSupportedLanguages(languages: Array<Language>) {
    this.supportedLanguagesAnnounced.next(languages);
  }

  setSupportedLanguages(languages: Array<Language>): void {
    this.supportedLanguages = languages;
  }

  setSelectedLanguage(language: Language): void {
    this.selectedLanguage = language;
    this.replaySubjectSelectedLanguage.next(language);
  }

  getSupportedLanguages(): ReplaySubject<Array<Language>> {
    return this.replaySubjectLanguages;
  }

  private extractData(res: Response) {
    let body = res.json();
    return body || {};
  }

  private handleError(error: any) {
    // In a real world app, we might use a remote logging infrastructure
    // We'd also dig deeper into the error to get a better message
    let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg); // log to console instead
    return Observable.throw(errMsg);
  }
}

