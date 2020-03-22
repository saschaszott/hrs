package de.wvv.web.rest;

import de.wvv.domain.WorkingStyle;
import de.wvv.repository.WorkingStyleRepository;
import de.wvv.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link de.wvv.domain.WorkingStyle}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class WorkingStyleResource {

    private final Logger log = LoggerFactory.getLogger(WorkingStyleResource.class);

    private static final String ENTITY_NAME = "workingStyle";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final WorkingStyleRepository workingStyleRepository;

    public WorkingStyleResource(WorkingStyleRepository workingStyleRepository) {
        this.workingStyleRepository = workingStyleRepository;
    }

    /**
     * {@code POST  /working-styles} : Create a new workingStyle.
     *
     * @param workingStyle the workingStyle to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new workingStyle, or with status {@code 400 (Bad Request)} if the workingStyle has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/working-styles")
    public ResponseEntity<WorkingStyle> createWorkingStyle(@RequestBody WorkingStyle workingStyle) throws URISyntaxException {
        log.debug("REST request to save WorkingStyle : {}", workingStyle);
        if (workingStyle.getId() != null) {
            throw new BadRequestAlertException("A new workingStyle cannot already have an ID", ENTITY_NAME, "idexists");
        }
        WorkingStyle result = workingStyleRepository.save(workingStyle);
        return ResponseEntity.created(new URI("/api/working-styles/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /working-styles} : Updates an existing workingStyle.
     *
     * @param workingStyle the workingStyle to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated workingStyle,
     * or with status {@code 400 (Bad Request)} if the workingStyle is not valid,
     * or with status {@code 500 (Internal Server Error)} if the workingStyle couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/working-styles")
    public ResponseEntity<WorkingStyle> updateWorkingStyle(@RequestBody WorkingStyle workingStyle) throws URISyntaxException {
        log.debug("REST request to update WorkingStyle : {}", workingStyle);
        if (workingStyle.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        WorkingStyle result = workingStyleRepository.save(workingStyle);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, workingStyle.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /working-styles} : get all the workingStyles.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of workingStyles in body.
     */
    @GetMapping("/working-styles")
    public List<WorkingStyle> getAllWorkingStyles() {
        log.debug("REST request to get all WorkingStyles");
        return workingStyleRepository.findAll();
    }

    /**
     * {@code GET  /working-styles/:id} : get the "id" workingStyle.
     *
     * @param id the id of the workingStyle to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the workingStyle, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/working-styles/{id}")
    public ResponseEntity<WorkingStyle> getWorkingStyle(@PathVariable Long id) {
        log.debug("REST request to get WorkingStyle : {}", id);
        Optional<WorkingStyle> workingStyle = workingStyleRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(workingStyle);
    }

    /**
     * {@code DELETE  /working-styles/:id} : delete the "id" workingStyle.
     *
     * @param id the id of the workingStyle to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/working-styles/{id}")
    public ResponseEntity<Void> deleteWorkingStyle(@PathVariable Long id) {
        log.debug("REST request to delete WorkingStyle : {}", id);
        workingStyleRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
