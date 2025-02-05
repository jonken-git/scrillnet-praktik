# Kravspecifikation forumlär

## Beskrivning
Målet är att bygga ett verktyg för att kunna skapa egna formulär.  
Formuläret ska byggas med en uppsättning av fördefinierade inputs och/eller med inputs definierade av användaren.

## Tekniska Krav
- Användaren väljer att skapa ett nytt formulär.
- Användaren kan lägga till en titel på formuläret.
- Användaren kan sätta egen style på formuläret, exempelvis bakgrundfärg.
- Användaren kan välja vilka inputs som ska finnas i formuläret.
- Användaren kan sätta egen style på inputs i formuläret.
- Användaren kan ställa in ordningen på inputs i formuläret.

## Funktionalitet
Det kommer behövas en databas med lite grundläggande tabeller.  
När man skapar ett formulär så måste man välja vilken tabell formuläret ska vara kopplat till. 
I början är det bara users vi behöver tänka på, så det går jättebra att hårdkoda det.  

När man lägger till en input till sitt formulär så får man välja 
vilken kolumn i tabellen som inputen ska kopplas till. Här går det jättebra att göra en hårdkodad array med kolumnnamnen
från ```users```-tabellen. Man ska också kunna välja vilken typ av input det är, exempelvis text, number, email, textarea.
Börja med till exempel text och number.

Varje input ska kunna ha egen style, exempelvis färg och border-radius som användaren kan ställa in med
ett vänligt verktyg, till exempel en slider eller dropdown.

Man ska kunna ta tag i en input och dra den upp eller ner för att ändra ordningen de visas i.

### Databas
#### Tabell 1: ```users```
| kolumnnamn  | beskrivning                | exempel    |
|-------------|----------------------------|------------|
| id          | Autogenererat ID           | 1          |
| first_name  | Förnamn på en person       | Jonas      |
| last_name   | Efternamn på en person     | Karlsson   |
| phone       | Telefonnummer              | 0701234567 |      
#### Tabell 2: ```forms```
| kolumnnamn | beskrivning                          | exempel                                     |
|------------|--------------------------------------|---------------------------------------------|
| id         | Autogenererat ID                     | 1                                           |
| name       | Namnet/titeln på formuläret          | Kontakt                                     |
| style      | CSS styling för input                | {color: "black", background-color: "white"} |
| table      | Tabellen som formuläret kopplas till | users                                       |

#### Tabell 3: ```inputs```
| kolumnnamn | beskrivning                                            | exempel                                     | exempel2                                                                      |
|------------|--------------------------------------------------------|---------------------------------------------|-------------------------------------------------------------------------------| 
|  id        | Autogenererat ID                                       | 1                                           | 2                                                                             | 
|  type      | Typ av input, exempelvis text, number, email, textarea | text                                        | select                                                                        | 
|  label     | Beskrivning av input                                   | Förnamn:                                    | Bilmärke:                                                                     | 
|  column    | Kolumnen input är kopplad till                         | first_name                                  | brand                                                                         | 
|  data      | JSON med det som behövs för att rendera input          | { style: {color: "black"}, max-length: 40}  | { options: [{value: "saab", text: "Saab"}.,{value: "volvo", text: "Volvo"}] } | 

#### Tabell 4: ```form_inputs```
| kolumnnamn | beskrivning                                             | exempel |
|------------|---------------------------------------------------------|---------|
| id         | Autogenererat ID                                        | 1       |
| form_id    | ID för formuläret som inpuen hör till                   | 3       |
| input_id   | ID för input-rutan                                      | 17      |
| sort       | Ordning på input i formuläret                           | 5       |

