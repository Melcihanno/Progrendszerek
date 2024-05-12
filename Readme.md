Virtuális galéria projekt

Egy képzeletbeli geléria honlapja. A galéria honlapján megtekinthetünk festményeket.
Vásárolhatunk fesmtényeket, illetve eseményekre jelentkezhetünk, híreket olvashatunk. A honlap kétféle felhasználót különböztet meg.
Az első számú felhasználó a művész, a második a vásároló. Mind a kettő külön-külön jogosultságokkal rendelkezik. 
A funkciók többsége a művész jogosultsággal érhető el. A regisztráció során lehetőségünk van megadni, hogy művészek vagy vevők vagyunk.

Mapparendszer:
Két fő részből áll: a kliensből és a szerverből. 
A kliens mappában az Angular projekt található, míg a szerver mappában a szerveroldali fő függvények vannak.

A projekt futtatásához szükséges:
    Node.js és npm telepítése.
    Az Angular CLI telepítése globálisan: npm install -g @angular/cli.
    MongoDB Docker Image futtatása.
    Egy terminál a parancsok futtatásához.

Projekt Futtatása:
Nyissa meg a terminált és navigáljon a client mappába.
Indítsa el az Angular projektet a következő paranccsal:
    -ng serve
Nyisson meg egy másik terminált és navigáljon a server mappába.
Először telepítse a szükséges függőségeket a következő paranccsal:
    -npm install
Ezután adjon ki egy build parancsot:
    -npm run build
Végül indítsa el a szervert a következő paranccsal:
    -npm start
Docker Image Futtatása
Győződjön meg róla, hogy telepítve van a Docker a rendszerére.
Futtassa a következő parancsot a MongoDB Docker Image indításához:
    -docker run -d -p 27017:27017 --name mongodb mongo

Most már elindíthatja a projektet és tesztelheti az alkalmazást!