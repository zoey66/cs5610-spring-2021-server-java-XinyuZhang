package com.example.wbdvspring202101xinyuserverjava.services;

import org.springframework.stereotype.Service;
import com.example.wbdvspring202101xinyuserverjava.models.Widget;
import com.example.wbdvspring202101xinyuserverjava.repositories.WidgetRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
public class WidgetService {

    @Autowired
    WidgetRepository repository;

    //    private List<Widget> widgets = new ArrayList<Widget>();
//    {
//        Widget w1 = new Widget(123l, "ABC123", "HEADING", 1, "Welcome to Widgets");
//        Widget w2 = new Widget(234l, "ABC234", "PARAGRAPH", 1, "This is a paragraph");
//        Widget w3 = new Widget(345l, "ABC234", "HEADING", 2, "Welcome to WebDev");
//        Widget w4 = new Widget(456l, "ABC234", "PARAGRAPH", 1, "Lorem ipsum");
//        widgets.add(w1);
//        widgets.add(w2);
//        widgets.add(w3);
//        widgets.add(w4);
//    }
    // implement crud operations
    public Widget createWidgetForTopic(Widget widget) {
        return repository.save(widget);

    }
    public List<Widget> findAllWidgets() {
        return repository.findAllWidgets();

    }
    public List<Widget> findWidgetsForTopic(String topicId) {
        return repository.findWidgetsForTopic(topicId);

    }
    public Widget findWidgetById(Long id) {
        return repository.findWidgetById(id);

    }
    public Integer updateWidget(Long id, Widget newWidget) {
        Widget originalWidget = findWidgetById(id);
        originalWidget.setType(newWidget.getType());
        originalWidget.setText(newWidget.getText());
        originalWidget.setSrc(newWidget.getSrc());
        originalWidget.setOrdered(newWidget.getOrdered());
        repository.save(originalWidget);
        return 1;
    }
    public Integer deleteWidget(Long id) {

        repository.deleteById(id);
        return 1;

    }
}