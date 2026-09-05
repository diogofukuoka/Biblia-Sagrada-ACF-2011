const fs = require('fs');
let code = fs.readFileSync('index.html', 'utf8');

const target1 = `        } catch (e) {
          console.error("Erro ao carregar próximo capítulo:", e);
        } finally {
          isFetchingNext = false;
        }`;

const replace1 = `          if (elNotesSidebar.classList.contains("open")) {
            appendNotesChapterToFeed(bookObj.name, nextChap, false);
          }
        } catch (e) {
          console.error("Erro ao carregar próximo capítulo:", e);
        } finally {
          isFetchingNext = false;
        }`;

const target2 = `        } catch (e) {
          console.error("Erro ao carregar capítulo anterior:", e);
        } finally {
          isFetchingPrev = false;
        }`;

const replace2 = `          if (elNotesSidebar.classList.contains("open")) {
            appendNotesChapterToFeed(bookObj.name, prevChap, true);
          }
        } catch (e) {
          console.error("Erro ao carregar capítulo anterior:", e);
        } finally {
          isFetchingPrev = false;
        }`;

if (code.includes(target1) && code.includes(target2)) {
    code = code.replace(target1, replace1).replace(target2, replace2);
    fs.writeFileSync('index.html', code);
    console.log("Success");
} else {
    console.log("Target not found");
}
