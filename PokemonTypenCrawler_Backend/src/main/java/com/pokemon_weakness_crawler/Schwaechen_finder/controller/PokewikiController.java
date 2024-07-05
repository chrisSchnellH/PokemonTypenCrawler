package com.pokemon_weakness_crawler.Schwaechen_finder.controller;

import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000") // Erlaubt Anfragen von localhost:3000
public class PokewikiController {

    @GetMapping("/typen/{pokemon}")
    public List<List<String>> getTypen(@PathVariable String pokemon) {
        List<List<String>> typen = new ArrayList<>();
        String url = "https://www.pokewiki.de/" + pokemon;

        try {
            Document document = Jsoup.connect(url).get();

            Element effizienzTabelle = document.selectFirst(".effizienz-tabelle");

            if (effizienzTabelle != null) {

                Elements typeElements = effizienzTabelle.select("div > div");
                for (Element typeElement : typeElements) {
                    if (typeElement.selectFirst("div[style]") != null
                            || typeElement.selectFirst("div > ul") != null) {
                        continue;
                    };
                    // System.out.println(typeElement.selectFirst("div"));

                    List<String> innerList = new ArrayList<>();

                    Elements links = typeElement.select("a");
                    for (Element link : links) {
                        String text = link.text();
                        innerList.add(text);
                    }

                    typen.add(innerList);


                }
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
        // System.out.println(typen);
        return typen;
    }
}